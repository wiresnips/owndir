const esbuild = require('esbuild')
const { externalizeBinariesPlugin } = require('./plugin-externalize-binaries.js')
const { injectDirnameFilenamePlugin } = require('./plugin-inject-dirname-filename.js')

module.exports = async function bundle (src, dst, originalPath) {

  return esbuild.build({
    platform: 'node', // 'neutral' ? see: https://esbuild.github.io/api/#platform
    entryPoints: [src],
    // absWorkingDir: src,
    outfile: dst,
    bundle: true,
    minify: false,
    sourcemap: 'inline',
    loader: { 
      '.css': 'empty',
      '.scss': 'empty',
      '.sass': 'empty'
    },
    plugins: [
      externalizeBinariesPlugin,
      injectDirnameFilenamePlugin
    ],
  }).then(result => {
      result.errors.forEach(error => console.error(error))
      result.warnings.forEach(warning => console.warn(warning))
      return result
  })
}
