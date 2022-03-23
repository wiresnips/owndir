
const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative, basename } = require("path")



async function build (buildFns, srcRoot, dstRoot, path) {
  path = path || ''
  const isRoot = path === '';

  console.log('building', path)
  
  const src = resolve(srcRoot, path)
  const dst = resolve(dstRoot, path, '.central')
  await mkdir(dst)

  /*
    I want to support BUILD plugins
      they have to be distinct from regular plugins, 
      because they have to run BEFORE I've built the module

      Don't know what that will look like yet

    THIS is where it'll have to happen, though
      so, just keep that in mind
  */

  const candidates = await fsp.readdir(src).then(relPaths => (relPaths
        .filter(rel => rel.startsWith('.central'))
        .map(rel => resolve(src, rel))))


  // FOR NOW we're going to say that the buildFn takes source-path, dest-path
  let builtAnything
  for (let cpath of candidates) {
    if (await buildModule(buildFns, resolve(src, cpath), resolve(dst, 'central.js')))
      break;
  }


  // okay, let's also build any plugins that are present
  const srcPlugins = resolve(src, '.central', 'plugins')
  const dstPlugins = resolve(dst, 'plugins')
  await mkdir(dstPlugins);

  await (fsp.stat(srcPlugins)
    .then(dstat => dstat.isDirectory() ? fsp.readdir(srcPlugins) : [])
    .then(x => { console.log(x); return x })
    .then(srcPluginPaths => srcPluginPaths.map(
      relPath => buildModule(buildFns, resolve(srcPlugins, relPath), resolve(dstPlugins, `${relPath}.js`))))
    .then(x => Promise.all(x))
    .catch(err => {
        if (err.code !== 'ENOENT') {
          console.log('error building plugins', err)
        }
    })
  )

  await (fsp.readdir(src)
    // .then(x => {console.log('child paths:', x); return x})
    .then(childPaths => Promise.all(
      childPaths
        .filter(relPath => relPath !== '.central') // don't recurse into .central dirs
        // .filter(relPath => !relPath.startsWith('.')) // or maybe, we want to skip *all* hidden dirs?
        .map(relPath => {

          // console.log('attempting to build', {srcRoot, path, relPath})

          const absPath = resolve(srcRoot, path, relPath)
          const childPath = relative(srcRoot, absPath)

          return (fsp.stat(absPath)
            .then(sstat => sstat.isDirectory() && build(buildFns, srcRoot, dstRoot, childPath))
            .catch((err) => {
              console.error(err)
            }))
        })
    ))
    .then(() => genIndexJs(dst, isRoot))
  )




}

function mkdir (path) {
  return (fsp.stat(path)
    .then(dstat => dstat.isDirectory() || fsp.mkdir(path, {recursive: true}))
    .catch(() => fsp.mkdir(path, {recursive: true}))
  )
}


// src should be a target (either a specific file, or else a folder containing a project)
// dst should be a target (in the form of a file specifically, complete with .js extension)
async function buildModule (buildFns, src, dst) {
  // console.log('buildModule', src, dst, buildFns)

  for (const buildFn of buildFns) {
    let artifact = await buildFn(src, dst)
    if (artifact)
      return artifact
  }

  return null;
}


async function exists (path) {
  return fsp.access(path, fs.constants.R_OK).then(() => path).catch(() => null)
}

async function genIndexJs (dst, isRoot) {
  const childPaths = await (
    fsp.readdir(resolve(dst, '..'))
      .then(relPaths => relPaths.filter(path => !path.startsWith('.central')))
      .then(relPaths => Promise.all(relPaths.map(async (relPath) => {
          const absPath = resolve(dst, '..', relPath, '.central', 'index.js')
          const exists = await fsp.access(absPath, fs.constants.R_OK).then(() => true).catch(() => false)
          return exists ? [relPath, absPath] : null;
      })))
      .then(absPaths => absPaths.filter(x => !!x))
  )

  const {loadSelf, loadParent, loadChildren, moduleExport} = INDEX_JS_FRAGMENTS
  const index_js = `${loadSelf}
${!isRoot ? loadParent : ''}
const children = [
  ${childPaths.map(path => JSON.stringify(path)).join(',\n  ')}
];
${loadChildren}
${moduleExport}`;

  return fsp.writeFile(resolve(dst, 'index.js'), index_js)
}



// thanks, I hate it

const INDEX_JS_FRAGMENTS = {
  loadSelf: `

var self;
try {
  self = require('./central.js')
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") {
    console.log('Error loading', __dirname)
    console.error(error)
  }
  self = {}
}

if (!self['.central']) {
  self['.central'] = {}
}

`,

  loadParent: `

try {
  const parent = require('../../.central/index.js')
  self['.central'].parent = parent
  Object.setPrototypeOf(module.exports, parent)
} catch (error) {
  console.log('error loading parent of', __dirname)
  console.error(error)
}

`,

  loadChildren: `

if (!self['.central'].children) {
  self['.central'].children = {}
}

for (const [name, path] of children) {
  try {
    self['.central'].children[name] = require(path)
  } catch (error) {
    console.log('error loading child', name, 'at', path)
    console.error(error)
  }
}

`,

  moduleExport: `

Object.assign(module.exports, self);
`
}



module.exports = build