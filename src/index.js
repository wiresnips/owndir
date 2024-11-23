const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative } = require('path')

const crypto = require('crypto')

const chokidar = require('chokidar')
const express = require('express')

const { isDir, isFile } = require('../libs/utils/fs-utils/index.js')
const build = require('./build/build.js')
const bundle = require('./build/bundle.js')
const fsInterface = require('./fsNode/interface_server.js')
const { router } = require('./fsNode/router')


var args = (require('yargs/yargs')(process.argv.slice(2))
  .option('r', {
    alias: "run",
    default: true,
    type: "boolean"
  })
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
  .option('b', {
    alias: 'build',
    default: false,
    type: 'boolean'
  })
  .option('v', {
    alias: 'verbose',
    default: false,
    type: 'boolean'
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






process.on('unhandledRejection', (error, promise) => {
  console.log('Unhandled Rejection:', {error, promise});
});





(async function () {
  const forceBuild = args.build;

  const moduleDir = resolve(buildDir, "module")
  if (forceBuild || !(await isFile(resolve(moduleDir, 'index.js')))) {
    await build(path, moduleDir);
  }

  // server
  const serverDir = resolve(buildDir, "server");
  const serverJsPath = resolve(serverDir, 'dist.js');

  if (forceBuild || !(await isFile(serverJsPath))) {
    const customServerBundler = resolve(path, '.owndir', 'build', 'server');
    const serverBundler = (await isDir(customServerBundler))
      ? customServerBundler
      : resolve(__dirname, '../assets/server-default')
    await fsp.cp(serverBundler, serverDir, {recursive: true});
    await bundle(serverDir, serverJsPath, buildDir, path);
  }


  // client
  const clientDir = resolve(buildDir, "client");
  const clientJsPath = resolve(clientDir, 'dist.js');

  if (forceBuild || !(await isFile(clientJsPath))) {
    const customClientBundler = resolve(path, '.owndir', 'build', 'client');
    const clientBundler = (await isDir(customClientBundler))
      ? customClientBundler
      : resolve(__dirname, '../assets/client-default')
    await fsp.cp(clientBundler, clientDir, {recursive: true});
    await bundle(clientDir, clientJsPath, buildDir, path);
  }


  const { OwnDir } = require(serverJsPath);
  const FsInterface = fsInterface.init(path, OwnDir);
  OwnDir.injectFsInterface(FsInterface);

  const app = express() 

  // just hardcode this shit for now
  // there should be a flag to disable the client entirely,
  // because it all _works_ if you ditch the SPA entirely and just use the server as a server
  // but I'm not expecially interested in exploring that right now, so here we are hardcoding
  app.use('/@/client.js', express.static(clientJsPath)); 


  const owndirRouter = router(FsInterface('/'));

  if (args.verbose) {
  app.use((req, res, next) => {
    res.on('finish', () => console.info(req.method, req.originalUrl, res.statusCode));
    next();
  })
}

  if (args.token) {
    app.use("/" + args.token, owndirRouter)
  } else {
    app.use(owndirRouter)
  }



  // if we turned off the run (presumably because we only wanted to build), we can drop out here
  if (!args.run) {
    return;
  }





  const server = app.listen(args.port, args.host, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })
})()
//*/