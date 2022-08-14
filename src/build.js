
const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative, basename, dirname } = require("path")

const pack = require('libnpmpack')
const install = require('./npm-install')
const {exists, isDir, mkdir} = require('../libs/utils/fs-utils')

const esbuild = require('esbuild')
// const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const { filelocPlugin } = require('esbuild-plugin-fileloc')



// this is a little hokey, but it should do the trick for the moment
// for a given folder, return: 1- any .js or .jsx file, 2- any folder which contains: package.json, index.js, or index.jsx
async function getJsTargets (path) {
  if (!await isDir(path)) {
    return []
  }

  const targets = (await fsp.readdir(path))
    .map(rel => resolve(path, rel))
    .sort();

  targets.map(async (target) => {
    if (!await isDir(target)) {
      return target.match(/\.jsx?$/)
        ? { target, isPackage: false }
        : nil;
    }

    const targetContents = await fsp.readdir(target);
    if (targetContents.includes('package.json')) {
      return { target, isPackage: true }
    }

    const innerTarget = targetContents.find(file => file.match(/^index\.jsx?$/));
    if (innerTarget) {
      return { 
        target: innerTarget && resolve(target, innerTarget), 
        isPackage: false 
      };
    }

    return nil;
  }).then(targets => targets.filter(t => !!t))
}

const varName = (() => {
  let count = 0;
  return () => `c_${count++}`
})()

const packageName = (() => {
  let count = 0;
  return (root, path) => {
    const munged = relative(root, path).replace(/[^\w]+/g, '_').replace(/^[^a-zA-Z]+/, '')
    return `${munged}_${count++}`
  }
})()


// promise an object that can be incorporated into package.json's dependencies
function packNode (root, path) {
  const name = packageName(root, path);
  const moduleDir = resolve(root, '.homestead', '.homestead-build', 'modules');
  const saveTo = resolve(moduleDir, `${name}.tgz`);

  return pack(path)
    .then(tarball => fsp.writeFile(saveTo, tarball))
    .then(() => [name, `file:${saveTo}`]);
}




async function build (src) {
  const buildDir = resolve(src, '.homestead', '.homestead-build')
  await mkdir(resolve(buildDir, 'modules')).catch(err => console.error(err));

  if (!await exists(buildDir)) {
    console.error(`failed to create build directory at ${buildDir}`);
    return false;  
  }

  // lodash is used in the build-server boilerplate
  let dependencies = {
    "lodash": "^4.17.0",
    "mmmagic": "^0.5.3"
  }
  let nodesJs = [
    await fsp.readFile(`${__dirname}/../assets/build-server.js`, 'utf-8'),
    `const directory = mapDir(${JSON.stringify(src)})`
  ];

  // return the string needed to require a module
  async function addReq ({target, isPackage}) {
    if (!isPackage) {
      return target;
    }
    const [reqName, depPath] = await packNode(src, target);
    dependencies[reqName] = depPath;
    return reqName;
  }

  async function buildNode (path, parentVar, rootVar) {
    if (!await isDir(path)) {
      return;
    }

    const selfVar = varName();
    rootVar = rootVar || selfVar;

    const relPath = relative(src, path);
    const nodeReq = await (getJsTargets(path)
      .then(targets => targets.find(({target}) => relative(path, target).startsWith(".homestead")))
      .then(addReq)
    );

    const plugins = await getJsTargets(resolve(path, '.homestead', 'plugins'))
      .then(plugins => Promise.all(plugins.map(async plugin => {
        plugin.req = await addReq(plugin.target)
        return plugin
      })));

    nodesJs.push(...genNodeJs(relPath, nodeReq, selfVar, parentVar, rootVar, plugins))

    const children = (await fsp.readdir(path))
      .filter(rel => !rel.startsWith('.homestead'))
      .map(rel => resolve(path, rel));

    for (const cpath of children) {
      await buildNode(cpath, selfVar, rootVar);
    }

    return selfVar;
  }

  const rootVar = await buildNode(src);
  nodesJs.push(`activatePlugins(${rootVar})`);
  nodesJs.push(`module.exports = ${rootVar};`);

  await fsp.writeFile(resolve(buildDir, 'index.js'), nodesJs.join('\n\n'));
  await fsp.writeFile(resolve(buildDir, 'package.json'), JSON.stringify({ dependencies }));
  await install(buildDir);

  return bundle(src, buildDir);
}

// thanks, I hate it
// but, I can figure out a better way later - for now, I need to prove the concept and move on

function genNodeJs (nodePath, reqPath, selfVar, parentVar, rootVar, plugins) {
  const dir = basename(nodePath);
  const jsFragments = [
    `console.log(${JSON.stringify(nodePath)});`,
    `var ${selfVar};`,
    (reqPath && `
try {
  ${selfVar} = require(${JSON.stringify(reqPath)})
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', ${JSON.stringify(reqPath)})
    console.error(error)
  }
  ${selfVar} = {}
}`
    ),
    `initHomestead(${selfVar}, ${parentVar || 'null'}, directory.walk(${JSON.stringify(nodePath)}))`
  ];

  if (!_.isEmpty(plugins)) {
    jsFragments.push(...(plugins.map(plugin => genPluginJs(plugin, selfVar))))
  }
  
  return (jsFragments
    .filter(js => !!js && !_.isEmpty(js))
    .map(js => js.trim())
  );
}


function genPluginJs (plugin, nodeVar) {
  return `
try {
  ${nodeVar}.H.plugins.push(require(${JSON.stringify(plugin.req)}))
} catch (error) {
  console.log('Error loading plugin: ${plugin.target}')
  console.error(error)
}`
}



async function bundle (rootDir, buildDir) {

    const basePath = resolve(buildDir, 'index.js');
    const serverPath = resolve(buildDir, 'server.js');
    const clientPath = resolve(buildDir, 'client.js');

    const server = await esbuild.build({
        platform: 'node', // 'neutral' ? see: https://esbuild.github.io/api/#platform
        entryPoints: [basePath],
        outfile: serverPath,
        bundle: true,
        minify: false,
        plugins: [filelocPlugin({ rootDir })],
    }).then(result => {
        console.log('build succeeded?', result)
        result.errors.forEach(error => console.error(error))
        result.warnings.forEach(warning => console.warn(warning))
        return result.outputFiles
    }).catch(err => {
        console.log('build failed?', err)
        console.error(err);
        return false;
    })

    return server

/*
    const client = await esbuild.build({
      platform: 'browser',
      entryPoints: [basePath],
      outfile: clientPath,
      bundle: true,
      minify: false,
      plugins: [NodeModulesPolyfillPlugin()]
    }).then(result => {
        console.log('lol fuck 2.1')
      result.errors.forEach(error => console.error(error))
      result.warnings.forEach(warning => console.warn(warning))
      return result.outputFiles
    }).catch(err => {
        console.log('lol fuck 2.2')
        console.error(err);
        return false;
    })

    return (Promise.all([server, client])
      .then(([server, client]) => ({server, client}))
    );
//*/
    
}



module.exports = build

