const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')
const { externalizeBinariesPlugin } = require('./plugin-externalize-binaries.js')
const { injectDirnameFilenamePlugin } = require('./plugin-inject-dirname-filename.js')
const { styleLoaderPlugin } = require('./plugin-style-loader.js')

module.exports = async function bundle (src, dst) {
  return esbuild.build({
    platform: 'browser',
    entryPoints: [src],
    outfile: dst,
    bundle: true,
    minify: false,
    sourcemap: 'inline',
    plugins: [
      sassPlugin(),
      NodeModulesPolyfillPlugin(), 
      NodeGlobalsPolyfillPlugin(), 
      externalizeBinariesPlugin, 
      injectDirnameFilenamePlugin,
      styleLoaderPlugin
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

