


const express = require('express')
const OwnDirRouter = require('./fsNode/router.js')
const { OwnDir } = require('owndir.package')

module.exports.OwnDir = OwnDir;
module.exports.Router = Router;

// don't love how slapdash this args-object is
// seems like it should be a more _designed_ interface, but I've just mashed everything in
// I guess first we make it work, then we can worry about making it good
function Router ({fsNodeRoot, clientDistPath}) {
  const owndirRouter = express.Router();
  
  owndirRouter.use('/@/client.js', express.static(clientDistPath));

  owndirRouter.use(OwnDirRouter(fsNodeRoot));

  return owndirRouter;
}


