
// a build is _basically_ like a plugin, with it's own dependencies
// so, I need to run "npm install" on the build, then I need to `require` the resulting package,
// and finally, I need to actually _run_ the build, and return the filepath of the resulting bundle

// all of this is PAINFULLY naive, which is just fine for now

const fsp = require('fs/promises')
const { resolve } = require('path')
const { isDir } = require('../../libs/utils/fs-utils/index.js')
const install = require('./yarn-install.js')

// target should indicate the specific build, ie __dirname/build/<hash>/server
// buildRoot will always be one step up, ie  __dirname/build/<hash> 
//    to direct the location of the yarn "global" cache
//    because android can't write to the default by default, which is troublesome
async function bundle (buildFrom, buildTo, buildRoot, originalPath) {
	const yarnGlobalFolder = resolve(buildRoot, ".yarn");

	const bundlerDir = resolve(buildFrom, 'bundler');
	if (!await isDir(bundlerDir)) {
		throw "Expected a bundler at " + bundlerDir;
	}

	const moduleDir = resolve(buildFrom, 'module');
	if (!await isDir(moduleDir)) {
		throw "Expected a module at " + moduleDir;
	}

	// our bundler can have it's own requirements (ie, something like webpack or esbuild)
	// since this is brought by the .owndir, we can't rely on everything being present
	await install(bundlerDir, yarnGlobalFolder);
	const bundler = await require(bundlerDir);

	// before we build the final package, remove any existing owndir installation,
	// because I'm a fucking idiot, and don't know how to force-install programmatically
	// await fsp.rm(resolve(moduleDir, "node_modules", "owndir.bundle"), {recursive: true}).catch((err) => {})
	
	await install(moduleDir, yarnGlobalFolder);

  const t1 = (new Date()).getTime()
	await bundler(moduleDir, buildTo, originalPath);
	const t2 = (new Date()).getTime();
  console.log(`    bundle took ${t2-t1} ms`);

}

module.exports = bundle;