const _ = require('lodash')
const fs = require('fs')
const pathUtil = require("path")


module.exports = function dirmap (path, visited) {
	const name = path.split(pathUtil.sep).pop()
	const absPath = pathUtil.resolve(path)
	visited = visited || {}

	// console.log(absPath, (!visited[absPath] && fs.existsSync(absPath) && !absPath.split(pathUtil.sep).includes('.central')))

	if (visited[absPath]) {
		return visited[absPath]
	}

	if (!fs.existsSync(absPath)) {
		return null
	}

	if (absPath.split(pathUtil.sep).includes('.central')) {
		return null
	}

	const stat = fs.statSync(absPath)
	let node = {
		name,
		path: absPath,
		isFile: stat.isFile(),
		isDir: stat.isDirectory(),
		isSymlink: stat.isSymbolicLink(),
		atime: stat.atime,
		mtime: stat.mtime,
		ctime: stat.ctime
	}
	visited[absPath] = node

	if (node.isFile) {
		node.size = stat.size
	}
	else if (node.isDir) {
		const children = fs.readdirSync(path)
		const centralIndex = children.indexOf('.central')

		if (centralIndex !== -1) {
			node.central = buildCentral(pathUtil.resolve(absPath, '.central'))
			children.splice(centralIndex, 1) // remove '.central' from the list of children
		}

		node.size = 0
		node.children = {}

		children.forEach(childName => {
			const childPath = pathUtil.resolve(absPath, childName)
			const child = dirmap(childPath, visited)
			if (child) {
				node.children[childName] = child
				node.size = node.size + child.size
			}
		})
	}

	return node
}

