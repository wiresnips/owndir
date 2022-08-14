const _ = require('lodash')
const fs = require('fs')
const { resolve } = require('path')


var args = (require('yargs/yargs')(process.argv.slice(2))
  .option('p', {
    alias: 'port',
    default: 0,
    type: 'integer'
  })
  .argv);

// there's probably a better way to establish a name and validation for an anonymous arg, but damned if I was able to figure out what it is
const path = _.last(args._)
const absPath = resolve(path)
if (!fs.existsSync(path)) {
  console.log(`unable to resolve path <${path}>`)
  process.exit(0)
}

if (!fs.statSync(absPath).isDirectory()) {
  console.log(`${path} is not a directory`)
  process.exit(0)
}
args.path = absPath;


(async function () {
  const build = require('./build.js')

  const directory = require('./directory.js')
  const router = require('./router.js')
  const express = require('express')

  await build(args.path);

  const serverHomestead = require(resolve(args.path, '.homestead', '.homestead-build', 'server.js'))
  console.log('built server homestead', serverHomestead)

  const dir = await directory.map(args.path)
  directory.inject(dir, serverHomestead)

  const app = express()
  app.use(router(serverHomestead))

  /*
  // I thought that I needed this for templating - now I'm less sure ...
  const appConfig = serverHomestead.H.app;
  if (!_.isEmpty(appConfig)) {
    _.toPairs(appConfig.engine || {}).forEach(([ext, engine]) => app.engine(ext, engine))
    _.toPairs(appConfig.set || {}).forEach(([key, val]) => app.set(key, val))
  }

  if (serverHomestead.serveClientJsAt) {
    const serveTo = serverHomestead.serveClientJsAt
    const serveFrom = resolve(args.path, '.homestead', '.homestead-build', 'client.js')
    app.get(serveTo, (req, res, next) => res.sendFile(serveFrom))
  }
  */

  const server = app.listen(args.port, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })



})()

