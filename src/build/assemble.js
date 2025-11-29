
/*
  Assemble the common '.owndir' code that is going to be imported by each build
*/

const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const pathUtil = require('path')
const { resolve, relative } = pathUtil
const { exists, isDir, mkdir, dirChildren } = require('../../libs/utils/fs-utils.js')


const genSym = (() => {
  let count = 0 // Date.now();
  return (prefix) => `${prefix || 'sym'}_${count++}`
})()


// return a shitty blob of info that I can use to bundle a module

async function moduleSpec (root, absPath, dst) {
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

  const fullName = genSym(relative(root, absPath).replaceAll(/[^\w]+/g, '_'));

  const spec = {
    root,
    path: absPath,
    symbol: fullName,

    req: (isPackage ? fullName :
          pathIsJs ? absPath :
          null),

    dep: (isPackage ? resolve(dst, 'modules', fullName) :
          null)
  }

  return spec
}

async function ensureVersion (modulePath) {
  const path = resolve(modulePath, "package.json");
  const package = JSON.parse(await fsp.readFile(path));

  if (!package.version) {
    package.version = "0.0.0"
    await fsp.writeFile(path, JSON.stringify(package, null, 2));
  }
}


function requireModuleJs ({symbol, req}, path) {
  return req
    ? `import { default as ${symbol} } from ${JSON.stringify(req)}`
    : `const ${symbol} = {};`
}


async function assemble (src, dst) {
  // console.log('ASSEMBLE:', { src, dst });

  await mkdir(resolve(dst, 'modules'), {recursive: true}).catch(err => console.error(err));

  if (!await exists(dst)) {
    console.error(`failed to create build directory at ${dst}`);
    return false;  
  }

  // lodash is used in the owndir-prefix boilerplate
  let dependencies = {
    "lodash": "^4.17.0"
  }

  const jsFragments = [
    await fsp.readFile(`${__dirname}/../../assets/owndir-prefix.js`, 'utf-8')
  ];

  async function assembleNode (absPath) {
    const relPath = relative(src, absPath)
    // console.log('assembleNode', { absPath, relPath })

    if (!await isDir(absPath)) {
      return;
    }

    const owndirCandidates = ((await fsp.readdir(absPath))
      .filter(relPath => relPath.startsWith('.owndir'))
      .map(relPath => resolve(absPath, relPath))
      .sort((a,b) => a.length - b.length)
    );

    if (!_.isEmpty(owndirCandidates)) {
      const spec = await moduleSpec(src, owndirCandidates[0], dst)

      const pluginDir = resolve(absPath, '.owndir', 'plugins')
      const plugins = await Promise.all(
        (await dirChildren(pluginDir))
          .map(relPath => moduleSpec(src, resolve(pluginDir, relPath), dst))
       );

      const owndirModuleSpecs = [spec, ...plugins];

      for (let mod of owndirModuleSpecs) {
        jsFragments.push(requireModuleJs(mod, relPath));

        if (mod.dep) {
          await fsp.cp(mod.path, mod.dep, { recursive: true });
          await ensureVersion(mod.dep);
          //dependencies[mod.symbol] = `link:${mod.dep}`;
          dependencies[mod.symbol] = mod.dep;
        }
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
        .map(rel => assembleNode(resolve(absPath, rel)))
      )
      .then(x => Promise.all(x))
    );
  }

  await assembleNode(src);

  await fsp.writeFile(
    resolve(dst, 'index.js'), 
    jsFragments.join('\n\n')
  );

  const packageJson = {
    name: "owndir.bundle",
    dependencies,
    files: ["index.js"],
  }

  await fsp.writeFile(
    resolve(dst, 'package.json'), 
    JSON.stringify(packageJson, null, 2)
  );
}



module.exports = assemble

