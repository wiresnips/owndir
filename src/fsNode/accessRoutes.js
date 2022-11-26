const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")
const { pathSplit } = require('../utils.js')
const { status, fsnErr } = require('./errors.js')

var bodyParser = require('body-parser')


/*
  this is confusing, because I have not done a good job, so bear with me
  there are two "variants" of routing that need to be performed:
    - owndir routing
        this is your "normal" routing, "/foo/bar/baz.txt"
        the owndirs along the path apply middleware, etc
        this could be ... anything, really
    - fsNode acess, last step is '@'
        /foo/bar/baz.txt/@
        this is your "file-system" access
        provides direct access to the fsNode api
        pre-empts owndir routing

  this function exists to inject that _second_ kind, fsNodeAccess, into the root fsNode, 
  ahead of the owndir routing so that it cannot be intercepted

*/ 


const accessRoutesRx = /.*\/@$/

function addFsAccessRoutes (fsNode) {
  const router = fsNode._router;

  router.all(accessRoutesRx, 
    bodyParser.raw({type:"*/*"}),

    async (req, res, next) => {
      const path = pathSplit(req.path)
      path.pop() // drop off the '@'
      const target = fsNode.walk(path)

      if (!target) {
        return next();
      }

      switch (req.query.call) {
        case 'read':    return read(target, req, res)
        case 'write':   return write(target, req, res)
        case 'move':    return move(target, req, res)
        case 'delete':  return del(target, req, res)
        case 'makeDir': return makeDir(target, req, res)
        case 'touch':   return touch(target, req, res)
        default:        return desc(target, req, res)
      }
    })
}




function desc (target, req, res) {
   return target.canRead() 
    ? res.json(target.desc())
    : res.status(status.forbidden).end() 
}

function read (target, req, res) {
  if (!target.isFile) {
    return desc(target, req, res);
  }

  const start = req.query.start || 0
  const end = req.query.end || Infinity
  res.setHeader("content-type", target.mime.contentType);
  return (target.read(start, end)
    .then(stream => stream.pipe(res))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );
}

function write (target, req, res) {
  const filename = req.query.filename;
  const opts = req.query.opts && JSON.parse(req.query.opts);
  const data = _.isEmpty(req.body) ? null : req.body;

  return (target.write(filename, data, opts)
    .then(success => res.json(success))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );
}

function move (target, req, res) {
  const dest = req.query.dest
  const opts = req.query.opts && JSON.parse(req.query.opts)
  return (target.move(dest, opts)
    .then(success => res.json(success))
    .catch(err => fsnErr(err).then(err => err.respond(res)))
  );  
}

function del (target, req, res) {}

function makeDir (target, req, res) {}

function touch (target, req, res) {}

module.exports = {
  addFsAccessRoutes
}