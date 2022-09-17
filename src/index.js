const _ = require('lodash')
const fs = require('fs')
const { resolve, relative } = require('path')
const chokidar = require('chokidar')
const express = require('express')

const build = require('./build.js')
const mapDir = require('./directory.js')
const router = require('./router.js')

var args = (require('yargs/yargs')(process.argv.slice(2))
  .option('p', {
    alias: 'port',
    default: 0,
    type: 'integer'
  })
  .argv);

// there's probably a better way to establish a name and validation for an anonymous arg, 
// but damned if I was able to figure out what it is
const path = _.last(args._)
const absPath = resolve(path)
if (!fs.existsSync(path)) {
  console.log(`unable to resolve path <${path}>`)
  process.exit(0)
}

if (!fs.statSync(absPath).isDirectory()) {
  console.log(`${path} is not a directory`)
  process.exit(0)
}
args.path = absPath;


(async function () {
  await build(args.path);
  const { Homestead } = require(resolve(args.path, '.homestead', '.homestead-build', 'server.js'));

  const directory = await mapDir(args.path);
  const homestead = await Homestead(directory);

  const app = express()
  app.use(router(homestead))
  
  const server = app.listen(args.port, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })

  chokidar.watch(args.path, {
    // cwd: args.path, // I think I _want_ the absolute path, actually ...
    ignored: /.*\/.homestead-build(\/.*)?/,
    ignoreInitial: true,
    awaitWriteFinish: true,
  })
  .on('all', (event, path) => {
    const fsNode = directory.walk(path, true);
    console.log('chokidar', event, path, fsNode?.relativePath);
    fsNode.onChange(event, path, true);
  });


})()



// require('chokidar').watch("/home/ben/projects/homestead/scratch", {ignoreInitial: true, awaitWriteFinish: true}).on( 'all', (event, path) => console.log(event, path))

