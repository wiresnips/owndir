
module.exports = function (req, node, callFn, ...args) {

	// http://expressjs.com/en/api.html#req.path
	//  > When called from middleware, the mount point is not included in req.path
	// therefore, this ONLY includes downstream segments
	const path = req.path.split('/').filter(step => step && step.length)

	for (let step of path) {
		let children = node.H.children
		let child = children && children[step]

		if (!child) {
			break;
		}

		node = child;
	}

	return callFn.apply(node, args)
}

