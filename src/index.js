const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative } = require('path')

const crypto = require('crypto')

const express = require('express')

const { isDir, isFile } = require('./utils/fs.js')
const assemble = require('./build/assemble.js')
const bundle = require('./build/bundle.js')
const fsInterface = require('./fsNode/interface_server.js')
const router = require('./fsNode/router.js')
const { FsServer: ClientFsServerWs } = require('./fsNode/interface_bridge_ws_server.js')


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
  .option('wrtc-proxy', {
    description: 'Allow remote clients to proxy through this server over WebRTC',
    default: false,
    type: 'boolean'
  })
  .option('client-fs', {
    description: 'Enable client filesystem operations',
    choices: ['none', 'ws'],
    default: 'ws',
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
const pathHash = crypto.createHash('sha1').update(path).digest('base64url');
const buildDir = resolve(__dirname, "..", "build", pathHash);

process.on('unhandledRejection', (error, promise) => {
  console.log('Unhandled Rejection:', {error, promise});
});


(async function () {
  const forceBuild = args.build;
  const clientFsInterfaceWs = (args.clientFs == 'ws');

  const packageDir = resolve(buildDir, "package")
  if (forceBuild || !(await isFile(resolve(packageDir, 'index.js')))) {
    await assemble(path, packageDir);
  }

  const serverDistPath = await bundle(path, buildDir, "server", forceBuild);
  const clientDistPath = await bundle(path, buildDir, "client", forceBuild);

  if (!args.run) {
    return;
  }

  const app = express();
  if (args.verbose) {
    app.use((req, res, next) => {
      console.info(new Date().getTime(), "REQUEST:", req.originalUrl);
      res.on('finish', () => console.info(new Date().getTime(), req.method, req.originalUrl, res.statusCode));
      next();
    })
  }

  const { OwnDir, Router } = require(serverDistPath);
  const FsInterface = fsInterface.init(path);
  OwnDir.injectFsInterface(FsInterface);
  const fsNodeRoot = FsInterface('/');

  // these arguments are bullshit, I have not discovered the interface yet
  // but I think (hope) I'm starting to converge towards something defensible
  const owndirRouter = Router({ fsNodeRoot })

  app.use(owndirRouter);

  const server = app.listen(args.port, args.host, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })

  // in parallel, stand up the websocket 
  if (clientFsInterfaceWs) {
    ClientFsServerWs(server, fsNodeRoot);
  }

})()
//*/
