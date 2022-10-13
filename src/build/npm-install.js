

// long and short is, npm has explicitly disabled the programmatic api, because 
// 	> it hasn't worked reliably nor been supported (or under semver) since npm 2 or 3.

// https://github.com/npm/cli/pull/3762
// https://github.com/npm/cli/releases/tag/v8.0.0

// pfft, whatever _MOM_
const Npm = require('../../node_modules/npm/lib/npm.js');

// look, I didn't want it to come to this either, but here we are.
// so, I'm gonna reach all the way around behind npm's back and see if I can make something work, 
// and if I can, then I can just lock the version off or whatever

module.exports = async function (buildPath) {
	try {
		const npm = new Npm();
		await npm.load();
		npm.localPrefix = buildPath
		
		await npm.exec('install', []);
	} catch (err) {
		console.error("npm install error", err);
		process.exit(1);
	}
}

