const fsp = require('fs/promises')
const { resolve } = require('path')
const crypto = require('crypto');
const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')
const postcss = require('postcss')
const Prefixer = require('postcss-prefix-selector')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')
const { externalizeBinariesPlugin } = require('./plugin-externalize-binaries.js')
const { injectDirnameFilenamePlugin } = require('./plugin-inject-dirname-filename.js')
const { styleLoaderPlugin } = require('./plugin-style-loader.js')

module.exports = async function bundle (src, dst) {

  async function scopeCssByModule (css, resolveDir, resolvePath) {
    const [packagePath] = resolveDir.match(/.*\/node_modules\/(@[^\/]+\/[^\/]+|[^\/]+)/);
    if (!packagePath) {
      // this should never happen, but just in case
      console.error("unable to identify source package of loaded css", {resolveDir, resolvePath})
      return css;
    }

    const package = await fsp.readFile(resolve(packagePath, "package.json"))
                             .then(json => JSON.parse(json))
                             .catch(err => {})
    if (!package) {
      console.error("unable to load package.json from source package of loaded css", {resolveDir, resolvePath})
      return css;
    }

    const { owndirModulePath } = package;
    // if it's the root, it'll always apply, so we don't need a prefix
    if (owndirModulePath == "/") {
      return css;
    }

    const moduleHash = owndirModulePath && "o" + crypto.createHash('sha1').update(owndirModulePath).digest('hex').slice(0,7);
    const prefixer = Prefixer({
      prefix: `.${moduleHash}`,
      transform: (prefix, selector, prefixedSelector, filePath) => {
        return (selector == ':root' || selector == "html")
          ? `${selector}.${moduleHash}`
          : prefixedSelector
        }
    });

    const prefixedCss = await postcss([prefixer]).process(css, { from: undefined });
    console.log("wrapModuleCssInClass", { /*css, */ resolveDir, resolvePath,  package, owndirModulePath, moduleHash, /* prefixedCss */ })
    return prefixedCss.css;
  }

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
      sassPlugin({ 
        loadPaths: [resolve(src, "node_modules")],
        transform: scopeCssByModule
      }),
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