const { resolve } = require('path')
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
    loader: {
      '.woff2': 'dataurl',
      // probably only woff2 is needed, the others are included for completeness
      // but if you wanted to write a custom bundler for a smaller dist, changing these to 'empty' might be a good place to start
      '.ttf': 'dataurl',
      '.otf': 'dataurl',
      '.woff': 'dataurl',
      '.eot': 'dataurl',

      // probably gonna want to add a bunch of image formats here as well, but it hasn't come up yet
    },
    plugins: [
      sassPlugin({ loadPaths: [resolve(src, "node_modules")] }),
      NodeModulesPolyfillPlugin(), 
      NodeGlobalsPolyfillPlugin(), 
      externalizeBinariesPlugin, 
      injectDirnameFilenamePlugin,
      styleLoaderPlugin
    ]
  }).then(result => {
      console.log('bundle (client) succeeded', result)

      if (result.errors?.length > 0) {
        console.log('bundle (client) failed', err)
        result.errors.forEach(error => console.error(error))
        return false
      }

      result.warnings.forEach(warning => console.warn(warning))      
      return result
  }).catch(err => {
      console.log('bundle (client) failed', err)
      console.error(err);
      return false;
  })
}

