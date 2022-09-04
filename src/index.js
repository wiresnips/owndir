const _ = require('lodash')
const fs = require('fs')
const { resolve } = require('path')

const build = require('./build.js')
const router = require('./router.js')
const mapDir = require('./directory.js')
const express = require('express')

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
  await build(args.path);
  const { Homestead } = require(resolve(args.path, '.homestead', '.homestead-build', 'server.js'));

  const directory = await mapDir(args.path);
  const homestead = await Homestead(directory);

  const app = express()
  app.use(router(homestead))
  const server = app.listen(args.port, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })
})()

