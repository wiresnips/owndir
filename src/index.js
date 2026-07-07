const fs = require('fs')
const fsp = require('fs/promises')
const { resolve, relative } = require('path')
const crypto = require('crypto')

const _ = require('lodash')
const express = require('express')
const session = require('express-session');
const  { default: open } = require('open');

const { isDir, isFile } = require('./utils/fs.js')
const assemble = require('./build/assemble.js')
const bundle = require('./build/bundle.js')

const FsInterface = require('./fsNode/interface_server.js')
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
  if (!serverDistPath) {
    console.log("server build failed");
    return;
  }

  const clientDistPath = await bundle(path, buildDir, "client", forceBuild);
  if (!clientDistPath) {
    console.log("client build failed");
    return;
  }

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

  if (!clientFsInterfaceWs) {
    app.use((re, res, next) => {
      const { upgrade } = req.headers
      if (upgrade) {
        return res.status(400).end();
      }
      next();
    })
  }

  // see: https://github.com/expressjs/session#readme
  const sessionMiddleware = session({
    secret: crypto.randomBytes(64).toString('base64url'), // yes, this will invalidate sessions on server restart
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { 
      path: '/', 
      httpOnly: false, 
      secure: false,
      maxAge: 259200000, // three days
    }
  });


  app.use(sessionMiddleware);

  const authToken = crypto.randomBytes(64).toString('base64url');
  app.use("/" + authToken, (req, res, next) => {
    // console.log("AUTH!", { authToken, sessionID: req.sessionID, session: req.session, })
    req.session.authenticated = true;
    req.session.save();
    res.redirect("/");
  })
  app.use((req, res, next) => {
    if (!req.session.authenticated) {
      return res.send("Session expired.\nRestart the server to initialize a new session.");
    }
    return next();
  })


  const fsNodeRoot = FsInterface(path);

  if (clientFsInterfaceHttp) {
    app.use(fsNodeUrlMatcher, FsRouter(fsNodeRoot));
  }
  const { OwnDir, Router } = require(serverDistPath);
  OwnDir.injectFsRoot(fsNodeRoot);

  // these arguments are bullshit, I have not discovered the interface yet
  // but I think (hope) I'm starting to converge towards something defensible
  const owndirRouter = Router({ fsNodeRoot })
  app.use(owndirRouter);

  const server = app.listen(args.port, args.host, () => {
    const serverAddr = server.address();
    console.log(`listening at ${JSON.stringify(serverAddr, null, 2)}`);

    const {address, port, family} = serverAddr;
    const loopbacks = ['::', '::1', '0.0.0.0', '127.0.0.1'];
    const localAddress = (
        loopbacks.includes(address) ? "localhost" : 
        isIpv6(address) ? `[${address}]` :
        address 
    );

    const authAddr = `http://${localAddress}:${port}/${authToken}`;
    console.log(`Auth at: ${authAddr}`);
    open(authAddr);
  })


  if (clientFsInterfaceWs) {
    ClientFsServerWs(server, sessionMiddleware, fsNodeRoot);
  }
  }

})()
//*/
