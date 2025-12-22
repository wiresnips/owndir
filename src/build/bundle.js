
// a build is _basically_ like a plugin, with it's own dependencies
// so, I need to run "npm install" on the build, then I need to `require` the resulting package,
// and finally, I need to actually _run_ the build, and return the filepath of the resulting bundle

// all of this is PAINFULLY naive, which is just fine for now

const fsp = require('fs/promises')
const { resolve } = require('path')
const { isFile, isDir, mkdir } = require('../utils/fs.js')
const install = require('./yarn-install.js')

const defaultBundlerServer = require('./defaults/server/bundler/index.js')
const defaultBundlerClient = require('./defaults/client/bundler/index.js')

async function bundle (path, buildDir, platform, forceBuild) {
  // path       : target directory-tree for which the .owndir is being built
  // buildDir   : build artifacts are kept here
  // platform   : "client" or "server" - anything else is a mistake
  // forceBuild : if true, ignore the existing dist.js and rebuild

  const packageDir = resolve(buildDir, 'package');
  if (!await isDir(packageDir)) {
    throw "Expected a package at " + packageDir + ". Did `assemble` fail to run somehow? (this should not be possible).";
  }

  if (platform != "server" && platform != "client") {
    throw `expected platform to be one of 'client', 'server'\n\tgot ${platform}`
  }

  const yarnGlobalFolder = resolve(buildDir, ".yarn");
  const platformDir = resolve(buildDir, platform);
  const distPath = resolve(platformDir, "dist.js");

  if (!forceBuild && (await isFile(distPath))) {
    return distPath;
  }

  await mkdir(platformDir);

  // load the platform-bundler (custom or default)
  let bundler;
  const platformBundlerDir = resolve(platformDir, "bundler");
  const customPlatformBundlerDir = resolve(path, ".owndir", "build", platform, "bundler");
  if (await isDir(customPlatformBundlerDir)) {
    console.log(`using custom ${platform} bundler`)
    await fsp.cp(customPlatformBundlerDir, platformBundlerDir, {recursive: true});

    // our bundler can have it's own requirements (ie, something like webpack or esbuild)
    // since this is brought by the .owndir, we can't rely on everything being present
    await install(platformBundlerDir, yarnGlobalFolder);
    bundler = await require(platformBundlerDir);
  }
  else {
    bundler = (
      (platform == "server") ? defaultBundlerServer :
      (platform == "client") ? defaultBundlerClient :
      null);
  }

  // copy the platform-package into <platformDir>/package, either from the default build OR from the custom build
  const platformPackageDir = resolve(platformDir, "package");
  const customPlatformPackageDir = resolve(path, ".owndir", "build", platform, "package");
  if (await isDir(customPlatformPackageDir)) {
    console.log(`using custom ${platform} package`)
    await fsp.cp(customPlatformPackageDir, platformPackageDir, {recursive: true});
  }
  else {
    console.log(`using default ${platform} package`);
    const defaultPlatformPackageDir = resolve(__dirname, "defaults", platform, "package");
    await fsp.cp(defaultPlatformPackageDir, platformPackageDir, {dereference: true, recursive: true});
  }


  // install the platform package dependencies
  await install(platformPackageDir, yarnGlobalFolder);

  // bundle the platform
  const t1 = (new Date()).getTime();
  await bundler(platformPackageDir, distPath);
  const t2 = (new Date()).getTime();
  console.log(`    bundle took ${t2-t1} ms`);

  return distPath;
}

module.exports = bundle;
