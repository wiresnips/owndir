const _ = require('lodash')
const tmp = require('tmp')
tmp.setGracefulCleanup();

const fs = require('fs')
const { resolve } = require('path')
const esbuild = require('esbuild')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')


var args = (require('yargs/yargs')(process.argv.slice(2))
  .option('p', {
    alias: 'port',
    default: 0,
    type: 'integer'
  })
  .option('noclean', {
    alias: 'nc',
    default: false,
    type: 'boolean'
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
const esbuildFn = require('../libs/builders/esbuild.js')
const buildFns = [esbuildFn]

const express = require('express')




tmp.dir({unsafeCleanup: !args.noclean, prefix: 'central'}, async (tmpErr, buildDir) => {

  await build(buildFns, args.path, buildDir)
  const builtPath = resolve(buildDir, '.central', 'index.js')
  console.log("built to", builtPath)

  const centralRoot = require(builtPath)
  console.log('built central', centralRoot)

  const dir = await directory.map(args.path)
  directory.inject(dir, centralRoot)



  // shit, this seems to be actually working
  // okay, we need to figure out how to actually incorporate it, then
  // and then, we also need to 

  const browserRepack = await esbuild.build({
    platform: 'browser',
    entryPoints: [builtPath],
    bundle: true,
    minify: false,
    write: false,
    plugins: [NodeModulesPolyfillPlugin()]
  }).then(result => {
    result.errors.forEach(error => console.error(error))
    result.warnings.forEach(warning => console.warn(warning))
    return result.outputFiles
  })





  const app = express()
  app.use(router(centralRoot))

  const appConfig = centralRoot['.central'].app;
  if (!_.isEmpty(appConfig)) {
    _.toPairs(appConfig.engine || {}).forEach(([ext, engine]) => app.engine(ext, engine))
    _.toPairs(appConfig.set || {}).forEach(([key, val]) => app.set(key, val))
  }

  const server = app.listen(args.port, () => {
    console.log(`listening at ${JSON.stringify(server.address(), null, 2)}`)
  })

  // tmp isn't actually handling sigint, see: https://github.com/raszi/node-tmp/issues/233
  process.on('SIGINT', () => server.close());
})

