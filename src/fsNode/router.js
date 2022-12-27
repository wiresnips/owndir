const _ = require('lodash')
const { resolve } = require('path')
const Router = require('express').Router
var bodyParser = require('body-parser')

const { status, fsnErr } = require('./errors.js')

function signature (spec) {
  return JSON.stringify(spec, (k, v) => _.isFunction(v) ? v.toString() : v);  
} 

function specRouter (spec, owndir) {
  const router = Router();
  router.all('*', async (req, res, next) => {
    const info = await owndir.directory.info();
    if (info) {
      info.isDirectory
        ? process.chdir(owndir.directory.absolutePath)
        : process.chdir(owndir.directory.parent.absolutePath);        
    }
    next();
  })
  
  spec.forEach(([path, ...methodHandlers]) => {
    methodHandlers.forEach(([method, ...handlers]) => {
      router[method](path, ...handlers.map(h => h.bind(owndir)))
    })
  })

  return router;
}

function getRouter (cache, spec, owndir) {
  const path = owndir.O.path;
  
  // this will let me know if the router's _changed_ since it was created, 
  // which feels like a REALLY dumb feature. Maybe I should just cut support for that entirely?
  const specSig = signature(spec);
  
  const existingRouter = cache[path];
  if (existingRouter?.signature === specSig) {
    return existingRouter;
  }

  // if the router didn't exist, or has changed, we need to rebuild it
  const router = specRouter(spec, owndir);

  // this is a compatibility shim -
  // I don't know whether I'm going to stuck with Express, but I don't want to commit yet
  // nesting like this keeps all of express's path manipulation working as expected (?),
  // even though I'm completely shortcircuiting the _routing_
  const wrappedRouter = Router()
  wrappedRouter.use(path, router);
  wrappedRouter.signature = specSig;
  wrappedRouter.path = path;

  cache[path] = wrappedRouter;
  return wrappedRouter;
}





function FsRouter (fsNode) {
  return Router().all(`/${fsNode.path}/@`, 
    bodyParser.raw({type:"*/*"}),
    async (req, res, next) => {
      switch (req.query.call) {
        case 'children': return children(fsNode, req, res)
        case 'delete':   return del(fsNode, req, res)
        case 'info':     return info(fsNode, req, res)
        case 'makeDir':  return makeDir(fsNode, req, res)
        case 'move':     return move(fsNode, req, res)
        case 'read':     return read(fsNode, req, res)
        case 'touch':    return touch(fsNode, req, res)
        case 'write':    return write(fsNode, req, res)
      }
      res.status(status.badRequest).json(
        {error: `unknown call <${req.query.call}>`}
      )
    }); 
}

function children(fsNode, req, res) {
  return (fsNode.children()
    .then(children => res.json(children.map(child => child.name)))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );  
}


function del (fsNode, req, res) {
  return (fsNode.delete()
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );  
}

function info (fsNode, req, res) {
  return (fsNode.info()
    .then(info => res.json(info))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );
}

function makeDir (fsNode, req, res) {
  return (fsNode.makeDir(filename, data, opts)
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );  
}

function move (fsNode, req, res) {
  const path = req.query.path
  const opts = req.query.opts && JSON.parse(req.query.opts)
  return (fsNode.move(path, opts)
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );  
}

function read (fsNode, req, res) {
  const start = req.query.start || 0
  const end = req.query.end || Infinity

  return (fsNode.info()
    .then(info => res.setHeader("content-type", info?.mime?.contentType))
    .then(() => fsNode.read(start, end))
    .then(stream => stream.pipe(res))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  )
}

function touch (target, req, res) {
  return (target.touch()
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );
}

function write (target, req, res) {
  const opts = req.query.opts && JSON.parse(req.query.opts);
  const data = _.isEmpty(req.body) ? null : req.body;

  return (target.write(data, opts)
    .then(success => res.json(success))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );
}





const getMiddleware = (function () {
  const cache = {}
  return function (owndir) {
    return getRouter(cache, owndir.O.middleware, owndir);
  }
})();

const getRoutes = (function () {
  const cache = {}
  return function (owndir) {
    return getRouter(cache, owndir.O.routes, owndir);
  }
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

function stack (fsNode, steps) {
  const handlers = []
  handlers.push(getMiddleware(fsNode.module));

  const [nextStep, ...restPath] = steps;
  if (nextStep && nextStep !== "@") {
    handlers.push(...stack(fsNode.walk(nextStep), restPath))
  }

  else {
    handlers.push(getFsRouter(fsNode))
  }

  handlers.push(getRoutes(fsNode.module));
  return handlers;
}

function stackHandler (stack) {
  return function (req, res, out) {
    var index = 0;
    function next (error) {
      return error 
        ? out(error)
        : stack[index++](req, res, next)
    }
    next();
  }
}


function FsReqHandler (root) {
  return function (req, res, next) {
    const { path } = req;
    const reqStack = stack(root, path.split('/').filter(s => !_.isEmpty(s)))
    const handler = stackHandler(reqStack)
    handler(req, res, next);
  }
}



module.exports.router = FsReqHandler