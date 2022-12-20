
/*
  Assemble the common '.owndir' code that is going to be imported by each build
*/

const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const pathUtil = require('path')
const { resolve, relative } = pathUtil

const packLib = require('libnpmpack')
const { exists, isDir, mkdir, dirChildren } = require('../../libs/utils/fs-utils')


const genSym = (() => {
  let count = 0 // Date.now();
  return (prefix) => `${prefix || 'sym'}_${count++}`
})()


// return a shitty blob of info that I can use to bundle a module

async function moduleSpec (root, absPath) {
  const pathIsDir = await isDir(absPath);
  let pathIsJs = !pathIsDir && absPath.match(/\.jsx?$/);

  const pathChildren = pathIsDir ? await fsp.readdir(absPath) : [];
  const isPackage = pathChildren && pathChildren.includes('package.json');

  if (!isPackage && !pathIsJs) {
    // if we aren't directly indicating a js(x?) file, AND we aren't indicating a module,
    // then maybe we'll look for index.js(x?) - if we don't have that, there's nothing to load
    const innerTarget = pathChildren.find(file => file.match(/^index\.jsx?$/));
    if (innerTarget) {
      absPath = resolve(absPath, innerTarget);
      pathIsJs = true;
    }
  }

  const symbol = genSym();

  return {
    root,
    path: absPath,
    symbol,
    req: (isPackage ? symbol : 
          pathIsJs ? absPath :
          null),
    isPackage
  }
}


async function packModule (buildDir, spec) {
  const { isPackage, root, path } = spec;
  if (isPackage) {
    const crumbs = (relative(root, path)
      .split(pathUtil.sep)
      .map(step => step.slice(0, 1))
      .filter(s => s != '.')
      .join(""));

    const filename = `${genSym(crumbs)}.tgz`
    const buildPath = resolve(buildDir, 'modules', filename);
    const installPath = resolve(buildDir, 'node_modules', spec.symbol);

    await fsp.rm(buildPath).catch(() => {});
    await fsp.rm(installPath, {recursive: true}).catch(() => {});

    spec.dep = `file:${buildPath}`;
    
    return packLib(path).then(tarball => fsp.writeFile(buildPath, tarball));
  }
}


function requireModuleJs ({symbol, req}, path) {
  return req
    ? `import { default as ${symbol} } from ${JSON.stringify(req)}`
    : `const ${symbol} = {};`

/*
  return `
const ${symbol} = (
  import(${JSON.stringify(req)})
    .then(m => m?.default || m)
    .catch((error) => {
      console.log('error importing', ${JSON.stringify(path)}, error);
      return {};
    })
);
`;
*/
}


async function build (src) {
  const buildDir = resolve(src, '.owndir', 'build', 'owndir')
  await mkdir(resolve(buildDir, 'modules')).catch(err => console.error(err));

  if (!await exists(buildDir)) {
    console.error(`failed to create build directory at ${buildDir}`);
    return false;  
  }

  // lodash is used in the owndir-prefix boilerplate
  let dependencies = {
    "lodash": "^4.17.0"
  }

  const jsFragments = [
    await fsp.readFile(`${__dirname}/../../assets/owndir-prefix.js`, 'utf-8')
  ];

  async function buildNode (absPath) {
    const relPath = relative(src, absPath)
    // console.log('buildNode', absPath)

    if (!await isDir(absPath)) {
      return;
    }

    const owndirCandidates = ((await fsp.readdir(absPath))
      .filter(relPath => relPath.startsWith('.owndir'))
      .map(relPath => resolve(absPath, relPath))
      .sort((a,b) => a.length - b.length)
    );

    if (!_.isEmpty(owndirCandidates)) {
      const spec = await moduleSpec(src, owndirCandidates[0])

      const pluginDir = resolve(absPath, '.owndir', 'plugins')
      const plugins = await Promise.all(
        (await dirChildren(pluginDir))
          .map(relPath => moduleSpec(src, resolve(pluginDir, relPath)))
       );

      const owndirModuleSpecs = [spec, ...plugins];
      for (let mod of owndirModuleSpecs) {
        if (mod.isPackage) {
          await packModule(buildDir, mod);
        }
        if (mod.dep) {
          dependencies[mod.symbol] = mod.dep;
        }

        jsFragments.push(requireModuleJs(mod, relPath));
      }

      jsFragments.push(`
addModule(
  ${JSON.stringify(relPath)}, 
  ${spec.symbol}, 
  [${plugins.map(plugin => plugin.symbol).join(', ')}]
)`    );
    }

    await (fsp.readdir(absPath)
      .then(relPaths => relPaths
        .filter(rel => !rel.startsWith('.owndir'))
        .map(rel => buildNode(resolve(absPath, rel)))
      )
      .then(x => Promise.all(x))
    );
  }

  await buildNode(src);

  await fsp.writeFile(
    resolve(buildDir, 'index.js'), 
    jsFragments.join('\n\n')
  );

  const packageJson = {
    name: "owndir.bundle",
    dependencies,
    files: ["index.js"],
  }

  await fsp.writeFile(
    resolve(buildDir, 'package.json'), 
    JSON.stringify(packageJson, null, 2)
  );

  return packLib(buildDir).then(tarball => fsp.writeFile(resolve(buildDir, 'owndir.tgz'), tarball));
}



module.exports = build

