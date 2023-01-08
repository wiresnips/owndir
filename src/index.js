const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative } = require('path')
const chokidar = require('chokidar')
const express = require('express')

const { isDir } = require('../libs/utils/fs-utils/index.js')

const build = require('./build/build.js')
const install = require('./build/yarn-install.js')
const bundle = require('./build/bundle.js')
const fsInterface = require('./fsNode/interface_server.js')
const { router } = require('./fsNode/router')


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

// just hardcode this shit for now
const buildDir = "/home/ben/projects/owndir/build";

(async function () {

  //*

  // build the common owndir code into <args.path>/.owndir/build/owndir
  const moduleDir = resolve(buildDir, "module")
  await build(args.path, moduleDir);
  // await install(moduleDir);

  // yes, this is stupid. No, I'm not going to improve it right now.
  const serverDir = resolve(buildDir, "server")
  const customServerBundler = resolve(args.path, '.owndir', 'build', 'server');
  const serverBundler = (await isDir(customServerBundler))
    ? customServerBundler
    : resolve(__dirname, '../assets/server-default')
  await fsp.cp(serverBundler, serverDir, {recursive: true});
  const serverJsPath = await bundle(serverDir);

  const clientDir = resolve(buildDir, "client")
  const customClientBundler = resolve(args.path, '.owndir', 'build', 'client');
  const clientBundler = (await isDir(customServerBundler))
    ? customClientBundler
    : resolve(__dirname, '../assets/client-default')
  await fsp.cp(clientBundler, clientDir, {recursive: true});
  const clientJsPath = await bundle(clientDir);


  const { OwnDir } = require(serverJsPath);
  const FsInterface = fsInterface.init(args.path, OwnDir);
  OwnDir.injectFsInterface(FsInterface);

  //*/

  const app = express() 

  // just hardcode this shit for now
  app.use('/@/client.js', express.static(clientJsPath));

  app.use(router(FsInterface('/')));
  
  const server = app.listen(args.port, args.host, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })

})()
