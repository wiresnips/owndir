const _ = require('lodash')
const { resolve } = require('path')
const Router = require('express').Router

const { status, fsnErr } = require('./errors.js')

module.exports = FsReqHandler

function reqInfo (req) {
  return {
    baseUrl: req.baseUrl,
    url: req.url,
    hostname: req.hostname,
    method: req.method,
    originalUrl: req.originalUrl,
    params: req.params,
    path: req.path,
    query: req.query
  }
}

const fsNodeHandlerCache = {};


function specRouter (spec, owndir) {
  const router = Router();
  router.label = `specRouter ${owndir.directory.absolutePath}`
  router.spec = spec

  /*
  router.use((req, res, next) => { 
    console.log(
      "specRouter", 
      owndir.directory.absolutePath, 
      reqInfo(req),
      spec
    ); 
    next(); 
  })
  //*/

  router.use(async (req, res, next) => {
    const info = await owndir.directory.info();
    if (info) {
      info.isDirectory
        ? process.chdir(owndir.directory.absolutePath)
        : process.chdir(owndir.directory.parent.absolutePath);        
    }
    next();
  })
  
  spec.forEach(([method, path, ...handlers]) => {
    // console.log("SPEC METHOD", {owndir, spec, path, method, handlers});
    router[method](path, ...handlers.map(h => h.bind(owndir)))
  })

  return router;
}

function childrenRouter (fsNode) {
  return async function (req, res, next) {
    const [, nextStep] = req.path?.match(/^\/([^\/]+)/) || [];
    /*
    console.log(
      "childrenRouter", 
      fsNode.absolutePath, 
      reqInfo(req),
      nextStep
    );
    //*/
    
    if (!nextStep) {
      // console.log("childrenRouter NO NEXT STEP")
      return next();
    }

    const child = fsNode.walk(nextStep);
    const childExists = await child.info();

    if (!childExists) {
      // console.log("childrenRouter NO MATCHING CHILD")
      return next();
    }

    FsReqHandler(child)(req, res, next);
  }
}

function FsReqHandler (fsNode) {
  console.log("FsReqHandler", { 
    fsNode, 
    'fsNode.module': fsNode.module ,
    'fsNode.root': fsNode.root 
  })


  const cacheHit = fsNodeHandlerCache[fsNode.path];
  if (cacheHit) {
    return cacheHit;
  }

  const owndir = fsNode.module;
  const {middleware, routes} = owndir.O;

  const isRoot = fsNode.relativePath == "";
  const relPath = isRoot ? "" : "/" + fsNode.name;
  const relPathLen = relPath.length;

  const middlewareRouter = specRouter(middleware, owndir);
  const childRouter = childrenRouter(fsNode);
  const routesRouter = specRouter(routes, owndir);

  const fsNodeHandler = async function (req, res, next) {
    /*
    console.log(
      "fsNodeReqHandler", 
      owndir.directory.absolutePath, 
      reqInfo(req),
      {isRoot, "fsNode.relativePath": fsNode.relativePath, relPath, relPathLen},
      fsNode,
      fsNode.module
    ); 
    //*/

    if (!req.path.startsWith(relPath)) {
      // console.log("!req.path.startsWith(relPath)", req.path, relPath)
      return next();
    }

    // mimic express' request path shenanigans
    const {url, baseUrl} = req;
    const resetAndExit = (err) => { req.url = url; req.baseUrl = baseUrl; next(err); }
    req.baseUrl = relPath;
    req.url = req.url.slice(relPathLen);

    middlewareRouter(req, res, (err) => {
      err ? resetAndExit(err) :
      childRouter(req, res, (err) => {
        err ? resetAndExit(err) :
        routesRouter(req, res, resetAndExit)
      })
    });
  }

  fsNodeHandlerCache[fsNode.path] = fsNodeHandler;
  return fsNodeHandler;
}
