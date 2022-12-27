const fsp = require('fs/promises')
const { resolve } = require('path')
const esbuild = require('esbuild')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')

module.exports = async function bundle (src, dst) {
  return esbuild.build({
    platform: 'browser',
    entryPoints: [src],
    // absWorkingDir: src,
    outfile: dst,
    bundle: true,
    minify: false,
    sourcemap: 'inline',
    plugins: [NodeModulesPolyfillPlugin(), NodeGlobalsPolyfillPlugin()]
  }).then(result => {
      console.log('build (client) succeeded', result)
      result.errors.forEach(error => console.error(error))
      result.warnings.forEach(warning => console.warn(warning))
      return result
  }).catch(err => {
      console.log('build (client) failed', err)
      console.error(err);
      return false;
  })
}


async function isFile (path) {
  return path && fsp.stat(path).then(dstat => dstat.isFile()).catch(err => false);
}

// decide whether or not a binary addon is being loaded - if so, externalize it with an absolute path
const externalizeBinaries = {
  name: 'externalize-binaries',
  setup(build) {
    build.onResolve({ filter: /\.node$/}, ({path, resolveDir}) => {
      return { external: true, path: resolve(resolveDir, path) };
    })

    const pathIfFile = path => isFile(path).then(res => res ? path : null);

    function LOAD_AS_FILE (path) {
      const candidates = [path, `${path}.js`, `${path}.json`, `${path}.node`];
      return Promise.all(candidates.map(pathIfFile)).then(res => res.find(x => !!x))
    }

    function LOAD_INDEX (path) {
      const candidates = ['index.js', 'index.json', 'index.node'].map(c => resolve(path, c));
      return Promise.all(candidates.map(pathIfFile)).then(res => res.find(x => !!x))
    } 

    async function LOAD_PACKAGE_MAIN (path) {
      try {
        const packagePath = resolve(path, 'package.json');
        if (await isFile(packagePath)) {
          const { main } = require(absPackagePath);
          return resolve(path, main);
        }
      } catch (err) {}
      return null;
    }


    build.onResolve({ filter: /^\.?\.?\/.*/ }, async ({path, resolveDir}) => {

      // https://nodejs.org/api/modules.html#modules_all_together
      if (!(path.startsWith('../') || path.startsWith('./') || path.startsWith('/'))) {
        return null;
      }
      path = resolve(resolveDir, path);

      const asFile = await LOAD_AS_FILE(path);
      if (asFile) { return asFile.endsWith('.node') ? { path, external: true } : null; }

      const main = await LOAD_PACKAGE_MAIN(path);
      if (main) {
        const asFileMain = await LOAD_AS_FILE(main);
        if (asFileMain) { return asFileMain.endsWith('.node') ? { path, external: true } : null; }
        const asIndexMain = LOAD_INDEX(main)
        if (asIndexMain) { return asIndexMain.endsWith('.node') ? { path, external: true } : null; }
      }

      const asIndex = await LOAD_INDEX(path);
      if (asIndex) { return asIndex.endsWith('.node') ? { path, external: true } : null; }

      return null;
    })
  },
}
