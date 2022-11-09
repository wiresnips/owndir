

// long and short is, npm has explicitly disabled the programmatic api, because 
// 	> it hasn't worked reliably nor been supported (or under semver) since npm 2 or 3.

// https://github.com/npm/cli/pull/3762
// https://github.com/npm/cli/releases/tag/v8.0.0

// pfft, whatever _MOM_
const Npm = require('../../node_modules/npm/lib/npm.js');
const log = require('../../node_modules/npm/lib/utils/log-shim.js')

// look, I didn't want it to come to this either, but here we are.
// so, I'm gonna reach all the way around behind npm's back and see if I can make something work, 
// and if I can, then I can just lock the version off or whatever


module.exports = async function (buildPath, args, opts) {
	args = args || []
	opts = opts || defaultOpts
	try {
		const npm = new Npm();
		await npm.load();
		npm.localPrefix = buildPath

		Object.entries(opts).forEach(
			([key, val]) => npm.config.set(key, val));

		// you would have thought that setting 'progress' false was good enough, huh?
		// this is what I get for using npm off-label
		if (opts.progress === false) {
			log.disableProgress(); 
		}

		await npm.exec('install', args);
	} catch (err) {
		console.error("npm install error", err);
		process.exit(1);
	}
}



const defaultOpts = {
	"progress": false,

	// prefer-online causes it to validate the cache, even when it doesn't think it needs to
	// we need to do this because otherwise the bloody {'owndir' : 'file:../../owndir.tgz' }
	// dependency will be CACHED and therefore not UPDATED, which is some grade-A bullshit
	"prefer-online": true,

	// package-lock false causes us to ignore package-lock.json (we don't read it, we don't write it)
	// we need this, because if we get a fresh owndir.tgz, package-lock.json might still know the hash
	// of an OLD version. Since we're trying to stay fresh, the hashes wouldn't match, and we'd crash
	"package-lock": false,
}


