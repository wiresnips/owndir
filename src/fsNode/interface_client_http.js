const _ = require('lodash')
const Router = require('express').Router
const bodyParser = require('body-parser')

const { status, fsnErr } = require('./errors.js')


module.exports.FsRouter = FsRouter

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

// wow, definitely never tested _this_ one
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


  if (req.query.unsub) {
    entry?.cleanup(true);
    return res.status(200).end();
  }

  // make a new subscription (or ressurect one that timed out)
  if (!entry) {

    const subId = nextSubId++;
    entry = subCache[subId] = { 
      subId: subId,
      openResponse: res, 
      events: [],
      fsNode: fsNode.relativePath
    };

    const fsSubFn = (event, node) => {
      if (entry.openResponse) {
        entry.openResponse.json({ 
          subId, 
          events: [[event, node.relativePath]] 
        });
        entry.openResponse = null;
      } else {
        entry.events.push([event, node.relativePath]);
      }
    };

    const paths = req.query.paths && JSON.parse(req.query.paths);
    const events = req.query.events && JSON.parse(req.query.events);
    const opts = req.query.opts && JSON.parse(req.query.opts);
    const fsUnsub = fsNode.sub(paths, events, fsSubFn, opts);
    
    entry.cleanup = (skipGrace) => {
      // if we're timing ourselves out, allow a grace period before _really_ killing ourselves
      if (entry.openResponse && !skipGrace) {
        entry.openResponse.status(408).end();
        entry.openResponse = null;
        entry.timeout = setTimeout(entry.cleanup, subTimeoutGrace);
      } else {
        fsUnsub();
        delete subCache[subId];
      }
    }
    entry.touch = () => {
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

function touch (fsNode, req, res) {
  return (fsNode.touch()
    .then(fsNode => res.json({path: fsNode.relativePath}))
    .catch(err => fsnErr(err).respond(res))
  );
}



function write (fsNode, req, res) {
  const opts = req.query.opts && JSON.parse(req.query.opts);
  const data = _.isEmpty(req.body) ? null : req.body;

  console.log("WRITE", {fsNode, data, query: req.query })
  console.log(req)


  return (fsNode.write(data, opts)
    .then(success => res.json(success))
    .catch(err => fsnErr(err).respond(res))
  );
}