
/*
  Assemble the common '.owndir' code that is going to be imported by each build
*/

const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative, basename, extname } = require('path')
const { exists, isDir, mkdir, dirChildren } = require('../utils/fs.js')


const genSym = (() => {
  let count = 0 // Date.now();
  return (prefix) => `${prefix || 'sym'}_${count++}`
})()


// return a shitty blob of info that I can use to assemble a package

async function dependencySpec (root, absPath, dst) {
  // possible scenarios:
  // 1- we are an empty directory, or non-javascript file
  // 2- we are a naked file, /.owndir.jsx
  // 3- we are a proper module, with a package.json
  // 4- we are a half-assed module, /.owndir/index.jsx (no package.json given)

  const symbol = genSym(relative(root, absPath).replaceAll(/[^\w]+/g, '_'));
  const depPath = resolve(dst, 'dependencies', symbol);

  const pathIsDir = await isDir(absPath);
  const pathIsNakedJs = !pathIsDir && absPath.match(/\.jsx?$/);
  const pathHasPackage = pathIsDir && await exists(resolve(absPath, "package.json"));
  const pathHasIndex = pathIsDir && (await dirChildren(absPath)).find(child => child.match(/\/index\.jsx?$/i))

  const emptyModule = (!pathIsNakedJs && !pathHasPackage && !pathHasIndex);
  const includeDepJs = !emptyModule
    ? `import { default as ${symbol} } from "${symbol}"`
    : `const ${symbol} = {};`

  return {
    path: absPath,
    symbol,
    emptyModule,
    depPath,
    copyPathToIndex: pathIsNakedJs && resolve(depPath, `index.${extname(absPath)}`),
    includeDepJs,
  }
}

async function configurePackage (spec, moduleRelPath) {
  const { depPath } = spec;
  const packagePath = resolve(depPath, "package.json");

  if (!(await exists(packagePath))) {
    await fsp.writeFile(packagePath, "{}");
  }

  const package = JSON.parse(await fsp.readFile(packagePath));

  if (!package.version) {
    package.version = "0.0.0";
  }

  package.owndirModulePath = "/" + moduleRelPath;

  await fsp.writeFile(packagePath, JSON.stringify(package, null, 2))
}


async function assemble (src, dst) {
  // console.log('ASSEMBLE:', { src, dst });

  await mkdir(resolve(dst, 'dependencies'))

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
      const spec = await dependencySpec(src, owndirCandidates[0], dst)

      const pluginDir = resolve(absPath, '.owndir', 'plugins')
      const plugins = await Promise.all(
        (await dirChildren(pluginDir))
          .map(depPath => dependencySpec(src, depPath, dst))
       );

      const owndirDependencySpecs = [spec, ...plugins];

      for (let spec of owndirDependencySpecs) {
        jsFragments.push(spec.includeDepJs);

        if (spec.emptyModule) {
          continue;
        }

        if (spec.copyPathToIndex) {
          await mkdir(spec.depPath);
          await fsp.cp(spec.path, spec.copyPathToIndex);
        }
        else {
          await fsp.cp(spec.path, spec.depPath, { recursive: true });
        }

        await configurePackage(spec, relPath);
        dependencies[spec.symbol] = spec.depPath;
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

