const _ = require('lodash')
const tmp = require('tmp')
tmp.setGracefulCleanup();

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
args.path = absPath



const build = require('./build.js')
const directory = require('./directory.js')
const router = require('./router.js')

// need a path to introduce difference build functions
const esbuild = require('./buildFn_esbuild.js')
const buildFns = [esbuild]

const express = require('express')



tmp.dir({unsafeCleanup: true, prefix: 'central-'}, async (tmpErr, buildDir) => {

  await build(buildFns, args.path, buildDir)

  const centralRoot = require(resolve(buildDir, 'index.js'))

  console.log('built central', centralRoot)


  const dir = await directory.map(args.path)
  directory.inject(dir, centralRoot)

  const app = express()
  app.use(router(centralRoot))

  const server = app.listen(args.port, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })

  // tmp isn't actually handling sigint, see: https://github.com/raszi/node-tmp/issues/233
  process.on('SIGINT', () => server.close());
})




