
const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const pathUtil = require('path')
const { resolve, relative, basename, dirname } = pathUtil

const packLib = require('libnpmpack')
const install = require('./npm-install')
const { exists, isFile, isDir, mkdir, dirChildren } = require('../libs/utils/fs-utils')

const esbuild = require('esbuild')
const { filelocPlugin } = require('esbuild-plugin-fileloc')



const genSym = (() => {
  let count = 0;
  return (prefix) => `${prefix || 'sym'}_${count++}`
})()


// return a shitty bundle of info that I can use to bundle a module

async function moduleSpec (root, absPath) {
  const pathIsDir = await isDir(absPath);
  let pathIsJs = !pathIsDir && absPath.match(/\.jsx?$/);

  const pathChildren = pathIsDir ? await fsp.readdir(absPath) : [];
  const isPackage = pathChildren && pathChildren.includes('package.json');

  if (!isPackage && !pathIsJs) {
    // if we aren't directly indicating a js(x?) file, AND we aren't indicating a module,
    // then maybe we'll look for index.js(x?) - if we don't have that, there's nothing to load
    const innerTarget = pathChildren.find(file => file.match(/^index\.jsx?$/));
    if (innerTarget) {
      absPath = resolve(absPath, innerTarget);
      pathIsJs = true;
    }
  }

  const symbol = genSym();

  return {
    root,
    path: absPath,
    symbol,
    req: (isPackage ? symbol : 
          pathIsJs ? absPath :
          null),
    isPackage
  }
}


async function packModule (buildDir, spec) {
  const {isPackage, root, path} = spec;
  if (isPackage) {
    const crumbs = (relative(root, path)
      .split(pathUtil.sep)
      .map(step => step.slice(0, 1))
      .filter(s => s != '.')
      .join(""));

    const filename = `${genSym(crumbs)}.tgz`
    const buildPath = resolve(buildDir, 'modules', filename);
    const installPath = resolve(buildDir, 'node_modules', spec.symbol);

    await fsp.rm(buildPath).catch(() => {});
    await fsp.rm(installPath, {recursive: true}).catch(() => {});

    spec.dep = `file:${buildPath}`;
    return packLib(path).then(tarball => fsp.writeFile(buildPath, tarball));
  }
}


function requireModuleJs ({symbol, req}, path) {
  if (!req) {
    return `const ${symbol} = function () { };`
  }
  return `
const ${symbol} = (
  import(${JSON.stringify(req)})
    .then(m => m?.default || m)
    .then(normalizeImport)
    .catch((error) => {
      console.log('error importing', ${JSON.stringify(path)}, error);
      return {};
    })
);
`;
}


async function build (src) {
  const buildDir = resolve(src, '.owndir', '.owndir-build')
  await mkdir(resolve(buildDir, 'modules')).catch(err => console.error(err));

  if (!await exists(buildDir)) {
    console.error(`failed to create build directory at ${buildDir}`);
    return false;  
  }

  // lodash is used in the build-server boilerplate
  let dependencies = {
    "lodash": "^4.17.0"
  }

  const jsFragments = [
    await fsp.readFile(`${__dirname}/../assets/build-server.js`, 'utf-8')
  ];

  async function buildNode (absPath) {
    // console.log('buildNode', absPath)

    if (!await isDir(absPath)) {
      return;
    }

    const owndirCandidates = ((await fsp.readdir(absPath))
      .filter(relPath => relPath.startsWith('.owndir'))
      .map(relPath => resolve(absPath, relPath))
      .sort((a,b) => a.length - b.length)
    );

    const spec = !_.isEmpty(owndirCandidates)
      ? await moduleSpec(src, owndirCandidates[0])
      : { symbol: genSym() };


    const pluginDir = resolve(absPath, '.owndir', 'plugins')
    const plugins = await Promise.all(
      (await dirChildren(pluginDir))
        .map(relPath => moduleSpec(src, resolve(pluginDir, relPath)))
     );

    const owndirModuleSpecs = [spec, ...plugins];
    for (let mod of owndirModuleSpecs) {
      if (mod.isPackage) {
        await packModule(buildDir, mod);
      }
      if (mod.dep) {
        dependencies[mod.symbol] = mod.dep;
      }

      const localPath = relative(src, absPath)
      jsFragments.push(requireModuleJs(mod, localPath));
    }

    jsFragments.push(`
register(
  ${JSON.stringify(relative(src, absPath))}, 
  ${spec.symbol}, 
  [${plugins.map(plugin => plugin.symbol).join(', ')}]
)`);


    await (fsp.readdir(absPath)
      .then(relPaths => relPaths
      .filter(rel => !rel.startsWith('.owndir'))
      .map(rel => buildNode(resolve(absPath, rel)))
      )
      .then(x => Promise.all(x))
    );
  }

  await buildNode(src);

  await fsp.writeFile(resolve(buildDir, 'index.js'), jsFragments.join('\n\n'));
  await fsp.writeFile(resolve(buildDir, 'package.json'), JSON.stringify({ dependencies }, null, 2));
  await install(buildDir);

  return bundle(src, buildDir);
}

async function bundle (rootDir, buildDir) {

    const basePath = resolve(buildDir, 'index.js');
    const serverPath = resolve(buildDir, 'server.js');

    const server = await esbuild.build({
        platform: 'node', // 'neutral' ? see: https://esbuild.github.io/api/#platform
        entryPoints: [basePath],
        outfile: serverPath,
        bundle: true,
        minify: false,
        plugins: [
          filelocPlugin({ rootDir }),
          externalizeBinaries
        ],
    }).then(result => {
        console.log('build succeeded?', result)
        result.errors.forEach(error => console.error(error))
        result.warnings.forEach(warning => console.warn(warning))
        return result.outputFiles
    }).catch(err => {
        console.log('build failed?', err)
        console.error(err);
        return false;
    })

    return server
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





module.exports = build

