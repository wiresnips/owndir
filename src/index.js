const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative } = require('path')

const crypto = require('crypto')

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
  .option('t', {
    alias: 'token',
    default: null,
    type: 'string'
  })
  .argv);

// there's probably a better way to establish a name and validation for an anonymous arg, 
// but damned if I was able to figure out what it is
const pathArg = _.last(args._)
if (!pathArg) {
  console.log(`specify a target path`)
  process.exit(1)
}

const path = resolve(pathArg)
if (!fs.existsSync(path)) {
  console.log(`unable to resolve path <${path}>`)
  process.exit(1)
}

if (!fs.statSync(path).isDirectory()) {
  console.log(`${path} is not a directory`)
  process.exit(1)
}

// we store the built artifacts "here" (with the owndir-server)
// because we want to keep it (faster launch), and DON'T want to pollute the owndir itself
const pathHash = crypto.createHash('sha1').update(path).digest('base64');
const buildDir = resolve(__dirname, "..", "build", pathHash);


(async function () {
  const moduleDir = resolve(buildDir, "module")
  await build(path, moduleDir);

  // yes, this is stupid. No, I'm not going to improve it right now.
  const serverDir = resolve(buildDir, "server")
  const customServerBundler = resolve(path, '.owndir', 'build', 'server');
  const serverBundler = (await isDir(customServerBundler))
    ? customServerBundler
    : resolve(__dirname, '../assets/server-default')
  await fsp.cp(serverBundler, serverDir, {recursive: true});
  const serverJsPath = await bundle(serverDir);

  const clientDir = resolve(buildDir, "client")
  const customClientBundler = resolve(path, '.owndir', 'build', 'client');
  const clientBundler = (await isDir(customClientBundler))
    ? customClientBundler
    : resolve(__dirname, '../assets/client-default')
  await fsp.cp(clientBundler, clientDir, {recursive: true});
  const clientJsPath = await bundle(clientDir);

  const { OwnDir } = require(serverJsPath);
  const FsInterface = fsInterface.init(path, OwnDir);
  OwnDir.injectFsInterface(FsInterface);

  const app = express() 
  app.use('/@/client.js', express.static(clientJsPath)); // just hardcode this shit for now


  const owndirRouter = router(FsInterface('/'));

  if (args.token) {
    app.use(token, owndirRouter)
  } else {
    app.use(owndirRouter)
  }

  const server = app.listen(args.port, args.host, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })
})()
//*/