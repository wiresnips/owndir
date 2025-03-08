const _ = require('lodash')
const { resolve } = require('path')
const Router = require('express').Router
var bodyParser = require('body-parser')

const { status, fsnErr } = require('./errors.js')




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





function FsRouter (fsNode) {
  const router = Router()
  router.label = `FsRouter ${fsNode.relativePath}`
  router.fsNode = fsNode

  /*
  router.all("*", (req, res, next) => {
    console.log(
      "fsRouter", 
      fsNode.relativePath, 
      reqInfo(req)
    ); 
    next();     
  })
  //*/

  return router.all('*', 
    bodyParser.raw({type:"*/*"}),
    async (req, res, next) => {
      // console.log("FsRouter", fsNode.relativePath)
      switch (req.query.call) {
        case 'children': return children(fsNode, req, res)
        case 'delete':   return del(fsNode, req, res)
        case 'info':     return info(fsNode, req, res)
        case 'makeDir':  return makeDir(fsNode, req, res)
        case 'move':     return move(fsNode, req, res)
        case 'read':     return read(fsNode, req, res)
        case 'sub':      return sub(fsNode, req, res)
        case 'touch':    return touch(fsNode, req, res)
        case 'write':    return write(fsNode, req, res)
      }
      res.status(status.badRequest).json(
        {error: `unknown call <${req.query.call}>`}
      )
    });
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

async function stack (fsNode, steps) {
  const nodeExists = await fsNode.info();
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
    if (nextStep === "@" && _.isEmpty(restPath)) {
      handlers.push(getFsRouter(fsNode))
    } else {
      handlers.push(...(await stack(fsNode.walk(nextStep), restPath)))
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

      if (index >= stack.length) {
        // return out();
      }

      return error 
        ? out(error)
        : stack[index++](req, res, next)
    }


    next();
  }
}


function FsReqHandler (root) {
  return async function (req, res, next) {
    const { path } = req;
    const reqStack = await stack(root, decodeURI(req.path).split('/').filter(s => !_.isEmpty(s)))
    const handler = stackHandler(reqStack)
    handler(req, res, next);
  }
}



module.exports.router = FsReqHandler









function children(fsNode, req, res) {
  return (fsNode.children()
    .then(children => res.json(children.map(child => child.name)))
    .catch(err => fsnErr(err).respond(res))
  );  
}


function del (fsNode, req, res) {
  return (fsNode.delete()
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).respond(res))
  );  
}

function info (fsNode, req, res) {
  return (fsNode.info()
    .then(info => res.json(info))
    .catch(err => fsnErr(err).respond(res))
  );
}

function makeDir (fsNode, req, res) {
  return (fsNode.makeDir(data, opts)
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).respond(res))
  );  
}

function move (fsNode, req, res) {
  const path = req.query.path
  const opts = req.query.opts && JSON.parse(req.query.opts)
  return (fsNode.move(path, opts)
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).respond(res))
  );  
}

function read (fsNode, req, res) {
  const start = req.query.start || 0
  const end = req.query.end || Infinity

  return (fsNode.info()
    .then(info => info?.mime && res.setHeader("content-type", info.mime))
    .then(() => fsNode.read(start, end))
    .then(stream => stream.pipe(res))
    .catch(err => fsnErr(err).respond(res))
  )
}

function touch (fsNode, req, res) {
  return (fsNode.touch()
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).respond(res))
  );
}

function write (fsNode, req, res) {
  const opts = req.query.opts && JSON.parse(req.query.opts);
  const data = _.isEmpty(req.body) ? null : req.body;

  return (fsNode.write(data, opts)
    .then(success => res.json(success))
    .catch(err => fsnErr(err).respond(res))
  );
}



/*
  FsNode Subscriptions!

  We use a long-polling method to keep the client up-to-date with fsNode subscriptions.
  But, we still need to manage subscriptions with subIds and save arrays of events, 
  because relying on the client to process an event and then re-subscribe for the next one
  will lead to gaps in coverage between sending the response and receiving the next request.

  when a new subscription is created:
    - create the server-side subscription
    - keep the request open (ie do not respond)
        - expect an event to fire soon - repond THEN

  when an fsNode event fires:
    - if there is an open request, respond immediately
    - if there is not, save the event to the subscription 

  when an existing subscription is re-affirmed
    - reset the subscription TTL
    - if there are any events in the queue, respond immediately with them
    - otherwise, keep the request open
*/

let nextSubId = 1;
const subCache = {};
const subTimeout = 100000;
const subTimeoutGrace = 5000; // window to recover a sub with a keep-alive

function sub (fsNode, req, res) {
  let entry = subCache[req.query.subId && JSON.parse(req.query.subId)];
  console.log("sub-handler", req.query, Object.values(subCache).map(e => [e.subId, e.fsNode]))


  if (req.query.unsub) {
    console.log("unsub!", req.query.subId, fsNode.relativePath);
    entry?.cleanup();
    return res.status(200).end();
  }

  // make a new subscription (or ressurect one that timed out)
  if (!entry) {
    console.log("sub-handler NEW", fsNode.relativePath, req.query, nextSubId);

    const subId = nextSubId++;
    entry = subCache[subId] = { 
      subId: subId,
      openResponse: res, 
      events: [],
      fsNode: fsNode.relativePath
    };

    const fsSubFn = (event, node) => {
      if (entry.openResponse) {
        console.log("sub-handler event SEND", subId, fsNode.relativePath, event, node.relativePath);
        entry.openResponse.json({ 
          subId, 
          events: [[event, node.relativePath]] 
        });
        entry.openResponse = null;
      } else {
        console.log("sub-handler event QUEUE", subId, fsNode.relativePath, event, node.relativePath);
        entry.events.push([event, node.relativePath]);
      }
    };

    const paths = req.query.paths && JSON.parse(req.query.paths);
    const events = req.query.events && JSON.parse(req.query.events);
    const opts = req.query.opts && JSON.parse(req.query.opts);
    const fsUnsub = fsNode.sub(paths, events, fsSubFn, opts);
    
    entry.cleanup = () => {
      console.log("sub-handler entry cleanup", subId, fsNode.relativePath, entry.subId);
      // if we're timing ourselves out, allow a grace period before _really_ killing ourselves
      if (entry.openResponse) {
        entry.openResponse.status(408).end();
        entry.openResponse = null;
        entry.timeout = setTimeout(entry.cleanup, subTimeoutGrace);
      } else {
        fsUnsub();
        delete subCache[subId];
      }
    }
    entry.touch = () => {
      console.log("sub-handler entry touch", subId, fsNode.relativePath, entry.subId);
      if (entry.timeout) {
        clearTimeout(entry.timeout);
      }
      const fudgeFactor = Math.random() * subTimeoutGrace; // fudge the timeouts so not everyone expires all at once
      entry.timeout = setTimeout(entry.cleanup, subTimeout + fudgeFactor);
    }
    entry.touch();
  }

  // existing subscription
  else {
    console.log("sub-handler EXISTING", fsNode.relativePath, req.query.subId, entry.subId);

    entry.touch();

    // is there already a response? then answer THAT first, whether or not there're events
    if (entry.openResponse) {
      entry.openResponse.json({ subId: entry.subId, events: entry.events });
      entry.openResponse = null;
      entry.events = [];
    }
    
    // if we have any events in the queue reply with them immediate
    // (ie, events that happened between response and re-request), 
    if (entry.events?.length > 0) {
      res.json(entry.events);
      entry.events = [];
    } 
    
    // otherwise, kick back and wait for something to happen
    else {
      entry.openResponse = res;
    }
  }
}