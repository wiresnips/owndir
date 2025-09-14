const fsp = require('fs/promises')
const { resolve, dirname } = require('path')

const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const core = require("@babel/core")

const esbuild = require('esbuild')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')
const { externalizeBinariesPlugin } = require('./plugin-externalize-binaries.js')
const { injectDirnameFilenamePlugin } = require('./plugin-inject-dirname-filename.js')

module.exports = async function bundle (src, dst, originalPath) {
  return esbuild.build({
    platform: 'browser',
    entryPoints: [src],
    outfile: dst,
    bundle: true,
    minify: false,
    sourcemap: 'inline',
    plugins: [
      NodeModulesPolyfillPlugin(), 
      NodeGlobalsPolyfillPlugin(), 
      externalizeBinariesPlugin, 
      injectDirnameFilenamePlugin
    ]
  }).then(result => {
      console.log('bundle (client) succeeded', result)
      result.errors.forEach(error => console.error(error))
      result.warnings.forEach(warning => console.warn(warning))
      return result
  }).catch(err => {
      console.log('bundle (client) failed', err)
      console.error(err);
      return false;
  })
}

