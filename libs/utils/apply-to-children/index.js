
function applyToChildrenAsync (homestead, fn) {
	const children = Object.values(homestead.H.children)
	return Promise.all([
		fn(homestead),
		...children.map(child => applyToChildrenAsync(child, fn))
	]);
}


function applyToChildrenSync (homestead, fn) {
	fn(node);
	const children = Object.values(homestead.H.children)
	children.forEach(child => applyToChildrenSync(child, fn))
}

module.exports = {
	async: applyToChildrenAsync,
	sync: applyToChildrenSync
}