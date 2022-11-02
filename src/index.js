const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative } = require('path')
const chokidar = require('chokidar')
const express = require('express')

const { isDir } = require('../libs/utils/fs-utils/index.js')

const build = require('./build/build.js')
const bundle = require('./build/bundle.js')
const mapDir = require('./fsNode/mapDir.js')

var args = (require('yargs/yargs')(process.argv.slice(2))
  .option('p', {
    alias: 'port',
    default: 0,
    type: 'integer'
  })
  .option('h', {
    alias: 'host',
    default: '127.0.0.1',
    type: 'string'
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

  // build the common owndir code
  await build(args.path);

  // yes, this is stupid. No, I'm not going to improve it right now.
  const serverBundler = resolve(args.path, '.owndir', 'build', 'server');
  if (!(await isDir(serverBundler))) {
    await fsp.cp(resolve(__dirname, '../assets/server-default'), serverBundler, {recursive: true})
  }
  const serverJsPath = await bundle(serverBundler);

  console.log("serverJsPath", serverJsPath)


  const clientBundler = resolve(args.path, '.owndir', 'build', 'client');
  if (!(await isDir(clientBundler))) {
    await fsp.cp(resolve(__dirname, '../assets/client-default'), clientBundler, {recursive: true})
  }
  const clientJsPath = await bundle(clientBundler);

  const directory = await mapDir(args.path)
  directory.permRead.allow("**")
  directory.permWrite.allow(fsNode => !fsNode.isOwnDir)

  const { OwnDir } = require(serverJsPath);
  const owndir = await OwnDir(directory);

  const app = express() 
  // just hardcode this shit for now
  app.use('/@/client.js', express.static(clientJsPath));
  app.use(directory.requestHandler.bind(directory));
  
  const server = app.listen(args.port, args.host, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })

  chokidar.watch(args.path, {
    // ignored: /.*\/.owndir\/build(\/.*)?/,
    ignoreInitial: true,
    awaitWriteFinish: true,
  })
  .on('all', (event, path) => {
    const fsNode = directory.walk(path, true);
    console.log('chokidar', event, path, fsNode?.relativePath);
    fsNode.onChange(event, path, true);
  });
})()


// require('chokidar').watch("/home/ben/projects/owndir/scratch", {ignoreInitial: true, awaitWriteFinish: true})
// .on( 'all', (event, path) => console.log(event, path))


/*  
  // okay, let's test out fsNode.move ...
  setTimeout(async () => {
    console.log('testing fsNode.move')
    let from = directory.walk('move-test/a')
    let to = directory.walk('move-test/b')

    let mover = from.walk('move-me');
    if (!mover) {
      mover = to.walk('move-me')
      from = directory.walk('move-test/b')
      to = directory.walk('move-test/a')
    }

    console.log({
      mover: mover.relativePath,
      from: from.relativePath,
      to: to.relativePath,

      owndir: {
        targetSaysWhat: mover.owndir.targetSaysWhat,
        testValue: mover.owndir.testValue
      },

      perms: {
        permRead: mover.permRead,
        permWrite: mover.permWrite
      },

    })


    console.log( await mover.move(from.getWalkTo(to) + '/' + mover.name) )

    console.log({
        targetSaysWhat: mover.owndir.targetSaysWhat,
        testValue: mover.owndir.testValue
      })

  }, 1000)
  */