
const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative, basename, dirname } = require("path")

const pack = require('libnpmpack')
const install = require('./npm-install')

const esbuild = require('esbuild')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const { filelocPlugin } = require('esbuild-plugin-fileloc')


async function exists (path) {
  return fsp.access(path, fs.constants.R_OK).then(() => path).catch(() => null)
}

async function isDir (path) {
  return path && fsp.stat(path).then(dstat => dstat.isDirectory()).catch(err => false);
}

function mkdir (path) {
  return (fsp.stat(path)
    .then(dstat => dstat.isDirectory() || fsp.mkdir(path, {recursive: true}))
    .catch(() => fsp.mkdir(path, {recursive: true}))
  )
}


// this is a little hokey, but it should do the trick for the moment
async function getTarget (path) {
  // console.log('getTarget', path)

  const [target] = (await fsp.readdir(path))
    .filter(rel => rel.startsWith('.central'))
    .map(rel => resolve(path, rel))
    .sort();

  if (!await isDir(target)) {
    return { target, isPackage: false }
  }

  const targetContents = await fsp.readdir(target);
  if (targetContents.includes('package.json')) {
    return { target, isPackage: true }
  }

  const innerTarget = targetContents.sort().find(file => file.startsWith('index.js'));
  return { 
    target: innerTarget &&  resolve(target, innerTarget), 
    isPackage: false 
  };
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


// promise an object that can be merged into package.json's dependencies
function packNode (root, path) {
  const name = packageName(root, path);
  const moduleDir = resolve(root, '.central', '.central-build', 'modules');
  const saveTo = resolve(moduleDir, `${name}.tgz`);

  return pack(path)
    .then(tarball => fsp.writeFile(saveTo, tarball))
    .then(() => [name, `file:${saveTo}`]);
}




async function build (src) {
  const buildDir = resolve(src, '.central', '.central-build')
  await mkdir(resolve(buildDir, 'modules')).catch(err => console.error(err));

  if (!await exists(buildDir)) {
    console.error(`failed to create build directory at ${buildDir}`);
    return false;  
  }

  let dependencies = {}
  let nodesJs = [];

  async function buildNode (path, parentVar, rootVar) {
    if (!await isDir(path)) {
      return;
    }

    const selfVar = varName();
    rootVar = rootVar || selfVar;

    const relPath = relative(src, path)
    const { target, isPackage } = await getTarget(path);

    // this would be an excellent place to include some kind of sanity-check

    if (!isPackage) {
      nodesJs.push(...genNodeJs(relPath, target, selfVar, parentVar, rootVar))
    }
    else {
      const [reqName, depPath] = await packNode(src, target);
      dependencies[reqName] = depPath;
      nodesJs.push(...genNodeJs(relPath, reqName, selfVar, parentVar, rootVar))
    }

    const children = (await fsp.readdir(path))
      .filter(rel => !rel.startsWith('.central'))
      .map(rel => resolve(path, rel));

    for (const cpath of children) {
      await buildNode(cpath, selfVar, rootVar);
    }

    return selfVar;
  }

  const rootVar = await buildNode(src);
  nodesJs.push(`module.exports = ${rootVar};`);

  await fsp.writeFile(resolve(buildDir, 'index.js'), nodesJs.join('\n\n'));
  await fsp.writeFile(resolve(buildDir, 'package.json'), JSON.stringify({ dependencies }));
  await install(buildDir);

  return bundle(src, buildDir);
}

// thanks, I hate it
// but, I can figure out a better way later - for now, I need to prove the concept and move on

function genNodeJs (nodePath, reqPath, selfVar, parentVar, rootVar) {
  const dir = basename(nodePath);
  const jsFragments = [`console.log(${JSON.stringify(nodePath)});`];

  if (!reqPath) {
    jsFragments.push(`

const ${selfVar} = {H: {children: {}}};
    
    `)
  } 

  else {
    jsFragments.push(`

var ${selfVar};
try {
  ${selfVar} = require(${JSON.stringify(reqPath)})
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', ${JSON.stringify(reqPath)})
    console.error(error)
  }
  ${selfVar} = {}
}

if (!${selfVar}.H) {
  ${selfVar}.H = {children: {}}
}
else if (!${selfVar}.H.children) {
  ${selfVar}.H.children = {}
}

    `)
  }

  if (parentVar) {
    jsFragments.push(`

${selfVar}.H.parent = ${parentVar};
${parentVar}.H.children[${JSON.stringify(dir)}] = ${selfVar};
Object.setPrototypeOf(${selfVar}, ${parentVar});

    `)
  }

  if (rootVar) {
    jsFragments.push(`

${selfVar}.H.root = ${rootVar};
      
      `)
  }
  
  return jsFragments.map(js => js.trim())
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
        console.log('lol fuck 1.1', result)
        result.errors.forEach(error => console.error(error))
        result.warnings.forEach(warning => console.warn(warning))
        return result.outputFiles
    }).catch(err => {
        console.log('lol fuck 1.2', err)
        console.error(err);
        return false;
    })

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
}



module.exports = build