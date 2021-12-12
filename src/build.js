
const _ = require('lodash')
const fsp = require('fs/promises')
const { resolve, relative } = require("path")



async function build (buildFns, srcRoot, dstRoot, path) {
  path = path || ''

  console.log('building', path)
  
  const src = resolve(srcRoot, path)
  const dst = resolve(dstRoot, path)

  // if the destination directory doesn't exist, create it (it almost certainly doesn't exist)
  await (fsp.stat(dst)
    .then(dstat => dstat.isDirectory() || fsp.mkdir(dst, {recursive: true}))
    .catch(() => fsp.mkdir(dst, {recursive: true}))
  )

  /*
    I want to support BUILD plugins
      they have to be distinct from regular plugins, 
      because they have to run BEFORE I've built the module

      Don't know what that will look like yet

    THIS is where it'll have to happen, though
      so, just keep that in mind
  */

  // FOR NOW we're going to say that the buildFn takes source-path, dest-path
  let built = false;
  for (let i = 0; !built && i < buildFns.length; i++) {
    built = !!(await buildFns[i](src, dst))
  }

  /*
    notice that I haven't specified anything about what the buildFn actually DOES
      this includes, eg, what the name of the OUTPUT FILE will be
    
    this is partly because I don't have a clear idea of what to specify yet,
    and partly because even if I did, I can't force the buildFns to actually listen
    so, the only enforcement will be whether it works or not, and that's what I have NOW, so whatever

    thus, by convention, the output will be: central.js
  */

  await fsp.copyFile(
    resolve(__dirname, '../assets/build/index.js'),
    resolve(dst, 'index.js')
  )

  return (fsp.readdir(src)
    .then(childPaths => Promise.all(
      childPaths
        .filter(relPath => relPath !== '.central') // don't recurse into .central dirs
        // .filter(relPath => !relPath.startsWith('.')) // or maybe, we want to skip *all* hidden dirs?
        .map(relPath => {
          const absPath = resolve(srcRoot, path, relPath)
          const childPath = relative(srcRoot, absPath)

          return (fsp.stat(absPath)
            .then(sstat => sstat.isDirectory() && build(buildFns, srcRoot, dstRoot, childPath))
            .catch((err) => {
              console.error(err)
            }))
        })
    )))
}


function wrappedBuild (buildFns, srcRoot, dstRoot) {
  // the default index.js requires it's parent, `require('../index.js')`
  // this does not seem wise at the root, where I have not controlled that file
  // therefore, swap in an individualized root index.js, that does not look for the parent
  return build(buildFns, srcRoot, dstRoot, '').then(res => {
    return fsp.copyFile(
      // DISABLED FOR NOW BECAUSE I NEED TO MUCK WITH SHIT
      // resolve(__dirname, '../assets/build/root-index.js'),
      resolve(__dirname, '../assets/build/index.js'),
      resolve(dstRoot, 'index.js')
    )
  })
}



module.exports = wrappedBuild

