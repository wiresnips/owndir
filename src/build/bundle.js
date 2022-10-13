
// a build is _basically_ like a plugin, with it's own dependencies
// so, I need to run "npm install" on the build, then I need to `require` the resulting package,
// and finally, I need to actually _run_ the build, and return the filepach of the resulting bundle

// all of this is PAINFULLY naive, which is just fine for now

const { resolve } = require('path')
const { isDir } = require('../../libs/utils/fs-utils/index.js')
const install = require('./npm-install.js')

// target should indicate the specific build, ie <the-owndir-root>/.owndir/build/server
async function bundle (target) {

	const bundlerDir = resolve(target, 'bundler');
	if (!await isDir(bundlerDir)) {
		throw "Expected a bundler at " + bundlerDir
	}

	const moduleDir = resolve(target, 'module');
	if (!await isDir(moduleDir)) {
		throw "Expected a module at " + moduleDir
	}

	const dist = resolve(target, 'dist.js')

	// our bundler can have it's own requirements (ie, something like webpack or esbuild)
	// since this is brought by the .owndir, we can't rely on everything being present
	await install(bundlerDir)
	const bundler = await require(bundlerDir)

	// our module is expected to depend on the target directory's built owndir module,
	// at <the-owndir-root>/.owndir/build/owndir/owndir.tgz (or, relatively, ../../owndir/owndir.tgz)
	// the build's module can also bring it's own dependencies, though
	await install(moduleDir)
	await bundler(moduleDir, dist)

	return dist
}

module.exports = bundle;