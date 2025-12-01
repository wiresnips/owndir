module.exports = require('owndir.package');

/*
module.exports = function (pathToServerBuild) {

  const { OwnDir } = require(pathToServerBuild);
  const FsInterface = fsInterface.init(path, OwnDir);
  const root = FsInterface('/');
  OwnDir.injectFsInterface(FsInterface);

  const app = express() 

  if (args.verbose) {
    app.use((req, res, next) => {
      res.on('finish', () => console.info(new Date().getTime(), req.method, req.originalUrl, res.statusCode));
      next();
    })
  }

  // just hardcode this shit for now
  // there should be a flag to disable the client entirely,
  // because it all _works_ if you ditch the SPA entirely and just use the server as a server
  // but I'm not especially interested in exploring that right now, so here we are hardcoding
  app.use('/@/client.js', express.static(clientJsPath)); 

  const owndirRouter = router(root, { fsInterface: clientFsInterfaceHttp });


  const server = app.listen(args.port, args.host, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })

  // in parallel, stand up the websocket 
  if (clientFsInterfaceWs) {
    ClientFsServerWs(server, root);
  }


}
*/