const _ = require('lodash')
const fsp = require('fs/promises')
const pathUtil = require("path")
const { pathSplit } = require('../utils.js')

/*
  this is confusing, because I have not done a good job, so bear with me
  there are two "variants" of routing that need to be performed:
    - owndir routing
        this is your "normal" routing, "/foo/bar/baz.txt"
        the owndirs along the path apply middleware, etc
        this could be ... anything, really
    - fsNode acess, last step is a single period
        /foo/bar/baz.txt/.
        this is your "file-system" access
        provides direct access to the fsNode api
        pre-empts owndir routing

  this function exists to inject that _second_ kind, fsNodeAccess, into the root fsNode, 
  ahead of the owndir routing so that it cannot be intercepted

*/ 

const accessRoutesRx = /.*\/\.O$/

function addFsAccessRoutes (fsNode) {
  const router = fsNode._router;

  router.all(accessRoutesRx, async (req, res, next) => {
    const path = pathSplit(req.path)
    path.pop() // drop off the '.O'
    const target = fsNode.walk(path)

    if (!target) {
      return next();
    }
    if (!target.canRead()) {
      return res.status(401).end()
    }

    const { call } = req.query
    if (_.isEmpty(call)) {
      return res.json(fsNode.json());
    }

    // read write move mkdir delete

    if (call === "read") {
      if (target.isFile) {
        console.log('sending', target.path, target.mime)
        res.setHeader("content-type", target.mime.contentType);
        return target.read().then(stream => stream.pipe(res))
      } else {
        return res.json(fsNode.json());
      }
    }

    if (!target.canWrite()) {
      return res.status(401).end()
    }

    if (call === "write") {}

    if (call === "delete") {}

    if (call === "move") {}

    if (call === "makeDir") {}

  })
}

module.exports = {
  addFsAccessRoutes
}