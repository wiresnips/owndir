
function applyToChildrenAsync (owndir, fn) {
	const children = Object.values(owndir.O.children)
	return Promise.all([
		fn(owndir),
		...children.map(child => applyToChildrenAsync(child, fn))
	]);
}


function applyToChildrenSync (owndir, fn) {
	fn(owndir);
	const children = Object.values(owndir.O.children)
	children.forEach(child => applyToChildrenSync(child, fn))
}

module.exports = {
	async: applyToChildrenAsync,
	sync: applyToChildrenSync
}