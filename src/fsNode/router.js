const _ = require('lodash')
const { resolve } = require('path')
const Router = require('express').Router

const { status, fsnErr } = require('./errors.js')
const { FsRouter } = require('./interface_client_http.js')


module.exports.router = FsReqHandler


function reqInfo (req) {
  return {
    baseUrl: req.baseUrl,
    hostname: req.hostname,
    method: req.method,
    originalUrl: req.originalUrl,
    params: req.params,
    path: req.path,
    query: req.query
  }
}







// in order to support literal paths, I need to bypass express' url parsing
// the mechanism that enables "/foo/:id/", makes it impossible to have proper handling for paths with colons
// (brackets are also a major problem)
// so, I'm gonna reach _deep_ into Express' guts and shim that shit out
function pathLiteralRouter (path, ...fns) {

  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (path.endsWith('/')) {
    path = path.slice(0,-1)
  }
  // if removing the last slash emptied the path, it was only a slash
  const fast_slash = path === ''

  const router = Router();
  router.label = `pathLiteralRouter ${path}`

  /*
  router.all("*", (req, res, next) => { 
    console.log(
      "pathLiteralRouter", 
      path, 
      reqInfo(req)
    ); 
    next(); 
  })
  //*/

  router.use("fake-path-so-layer-stops-yelling-at-me", ...fns);
  
  const layer = _.last(router.stack);
  layer.regexp = 'this "regex" should never have been used. something is wrong with fsNode/router.js'

  layer.match = function (reqPath) {
    const match = fast_slash || reqPath === path || reqPath.startsWith(path + '/');
    // console.log('layer.match', { reqPath, path, match });

    if (match) {
      this.path = path;
      this.params = {};
    }

    return match;
  }; 

  return router;
}






function specRouter (spec, owndir) {
  const router = Router();
  router.label = `specRouter ${owndir.directory.absolutePath}`
  router.spec = spec

  /*
  router.all("*", (req, res, next) => { 
    console.log(
      "specRouter", 
      owndir.directory.absolutePath, 
      reqInfo(req),
      spec
    ); 
    next(); 
  })
  //*/

  router.all('*', async (req, res, next) => {
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





function getRouter (cache, spec, owndir) {
  const path = owndir.O.path;
  let router = cache[path];
  
  if (router) {
    return router
  }

  router = pathLiteralRouter(path, specRouter(spec, owndir));
  cache[path] = router;
  return router;
}

const getMiddleware = (function () {
  const cache = {}
  const fn = function (owndir) {
    return getRouter(cache, owndir.O.middleware, owndir);
  }

  fn._o_middleware = true;

  return fn
})();

const getRoutes = (function () {
  const cache = {}
  const fn = function (owndir) {
    return getRouter(cache, owndir.O.routes, owndir);
  }
  fn._o_routes = true
  return fn;
})();

const getFsRouter = (function () {
  const cache = {}
  return function (fsNode) {
    const path = fsNode.relativePath;
    let router = cache[path]
    if (router) {
      return router;
    }

    router = FsRouter(fsNode);
    cache[path] = router;
    return router;
  }
})()






// this is a shitty immitation of how Express handles things
// because I'm not ready to throw it away entirely, but I also 
// can't have static routers representing dynamic filepaths

async function stack (opts, fsNode, steps) {
  const fsNodeInfo = await fsNode.info();
  const nodeExists = !!fsNodeInfo;
  const handlers = []


  /*
  handlers.push((req, res, next) => {
    console.log('\n\nMIDDLEWARE\n\n');
    console.log({req: reqInfo(req), fsNode: fsNode.absolutePath});
    next();
  })
  //*/

  if (nodeExists) {
    handlers.push(getMiddleware(fsNode.module));
  }

  /*
  handlers.push((req, res, next) => {
    console.log('\n\nSTEP\n\n');
    console.log({req: reqInfo(req), fsNode: fsNode.absolutePath});
    next();
  })
  //*/

  const [nextStep, ...restPath] = steps;
  
  if (nextStep) {
    if (nextStep === "@" && _.isEmpty(restPath) && opts.fsInterface) {
      handlers.push(getFsRouter(fsNode))
    } else {
      handlers.push(...(await stack(opts, fsNode.walk(nextStep), restPath)))
    }
  }

  /*
  handlers.push((req, res, next) => {
    console.log('\n\nROUTES\n\n');
    console.log({req: reqInfo(req), fsNode: fsNode.absolutePath});
    next();
  })
  //*/

  if (nodeExists) {
    handlers.push(getRoutes(fsNode.module));
  }

  /*
  handlers.push((req, res, next) => {
    console.log('\n\nDONE\n\n');
    console.log({req: reqInfo(req), fsNode: fsNode.absolutePath});
    next();
  })
  //*/

  return handlers;
}



function stackHandler (stack) {
  return function (req, res, out) {

    /*
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    console.log("===========================================")
    console.log("===========================================")
    //*/

    var index = 0;
    function next (error) {

      /*
      console.log('NEXT', {
        req: reqInfo(req),
        stack: stack.slice(index)
      })
      //*/

      if (error) {
        return out(error)
      }

      // if (index >= stack.length) {
      //   return out();
      // }

      return error 
        ? out(error)
        : stack[index++](req, res, next)
    }


    next();
  }
}


async function fsNodeDirectAccessHandler (fsNode) {

  const isOwndir = fsNode.path.includes(".owndir");
  if (isOwndir) {
    return null;
  }

  const info = await fsNode.info();
  if (!info?.isFile) {
    return null;
  }

  const canRead = await fsNode.canRead();
  if (!canRead) {
    return null;
  }

  /*
    TODO: evaluate cache handling
      we should be able to do _something_ clever with etags if the file changes, right?
  */

  return function (req, res, next) {
    // there's definitely a better way to do this, but for now I say fuck it
    if (req.method?.toLowerCase() != "get") {
      return next();
    }

    if (info.mime) {
      res.setHeader("content-type", info.mime);
    }

    fsNode.read()
      .then(stream => stream.pipe(res))
      .catch(err => fsnErr(err).respond(res));
  }
}


function FsReqHandler (root, opts) {
  return async function (req, res, next) {
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    const reqStack = await stack(opts, root, decodeURI(url.pathname).split('/').filter(s => !_.isEmpty(s)));

    // if we are pointing directly at a file that we are allowed to read, explose it directly with the lowest priority
    const directAccessHandler = await fsNodeDirectAccessHandler(root.walk(url.pathname));


    if (directAccessHandler) {
      reqStack.push(pathLiteralRouter(req.path, directAccessHandler));
    }

    const handler = stackHandler(reqStack);
    handler(req, res, next);
  }
}







