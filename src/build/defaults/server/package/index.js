const { resolve, dirname } = require('path')
const express = require('express')
const OwnDirRouter = require('./fsNode/router.js')
const { OwnDir } = require('owndir.package')

module.exports.OwnDir = OwnDir;
module.exports.Router = Router;

// don't love how slapdash this args-object is
// seems like it should be a more _designed_ interface, but I've just mashed everything in
// I guess first we make it work, then we can worry about making it good
function Router ({fsNodeRoot}) {
  const owndirRouter = express.Router();

  owndirRouter.use(OwnDirRouter(fsNodeRoot));

  // if the request fully whiffs, just send index.html
  // this is a holdover to (partially) match old behaviour, and it's _very_ dumb - likely target for future refactoring
  owndirRouter.use("*", express.static(resolve(fsNodeRoot.absolutePath, ".owndir", "static")));

  return owndirRouter;
}
