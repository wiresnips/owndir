const _ = require('lodash')
const fs = require('fs')
const pathUtil = require("path")
const compile = require("./compile.js")


function isCentralPath (absPath) {
	return absPath.split(pathUtil.sep).includes('.central')
}


function map (path, parentCentral, visited) {
	parentCentral = parentCentral || {}
	visited = visited ? { ...visited } : {} // shallow clone so sibling branches don't stomp

	const name = path.split(pathUtil.sep).filter(s => !_.isEmpty(s)).pop()
	const absPath = pathUtil.resolve(path)

	// console.log(absPath, (!visited[absPath] && fs.existsSync(absPath) && !absPath.split(pathUtil.sep).includes('.central')))

	if (!fs.existsSync(absPath)) { return null }
	if (isCentralPath(absPath)) { return null }

	if (visited[absPath]) { return null }
	visited[absPath] = true

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

	if (node.isFile) {
		node.size = stat.size
	}
	else if (node.isDir) {
		node.size = 0
		node.children = {}

		node.central = {
			...parentCentral, 
			...compile(pathUtil.resolve(absPath, '.central')) // if this doesn't exist, returns {}
		}

		fs.readdirSync(path).forEach(childName => {
			if (childName !== '.central') {
				const childPath = pathUtil.resolve(absPath, childName)
				const child = map(childPath, node.central, visited)
				if (child) {
					node.children[childName] = child
					node.size = node.size + child.size
				}
			}
		})

		// now that I've compiled my children, let's build our router
		node.router = router(node);
	}

	return node
}



// alright, what I'm doing HERE is, I'm taking an already-transformed, already compiled, central 
// and contructing a router that respects it


const Router = require('express').Router
const methods = require('methods')

function router (directory) {
	const { children } = directory.children
	let { middleware, routes } = directory.central['.central'] || {}

	const router = Router()

	// normalize middleware a little
	middleware = _.isArray(middleware) ? middleware : _.isFunction(middleware) ? [middleware] : []

	// and right at the front, make sure that our current context is available in the request
	middleware.unshift((req, res, next) => {
		req.context = directory;
		next()
	})

	middleware.forEach(mwareFn => router.use(mwareFn))

	_.toPairs(children).forEach(([key, child]) => {
		if (child.router)
			router.use(`/${key}`, child.router)
	})

	addRoutes(router, routes)
	return router
}

function addRoutes (router, routes) {
	const paths = Object.keys(routes || {})

	paths.forEach(path => {
		const handlers = routes[path]

		methods.forEach(method => {
			const handler = handlers[method]
			if (handler) {
				router[method](path, handler)
			}
		})
	})
}





function refreshPath (dir, path) {
	if (!path.startsWith(dir.path)) {
		return null
	}
	const pathSegments = path.slice(dir.path.length).split(pathUtil.sep).filter(segment => !_.isEmpty(segment))
	return _refreshPath(dir, {}, pathSegments)
}

function _refreshPath (parent, visited, [step, ...pathSegments]) {

	console.log('_refreshPath', parent, visited, step, pathSegments)

	visited = visited || {}
	visited[parent.path] = true

	const child = parent.children[step]

	if (!child || _.isEmpty(pathSegments))
		parent.children[step] = map(pathUtil.resolve(parent.path, step), parent.central, visited)
	else
		parent.children[step] = _refreshPath(child, visited, pathSegments)

	if (!parent.children[step]) {
		const {children} = parent
		delete children[step]
	}

	parent.size = Object.values(parent.children).reduce((size, child) => size + child.size, 0)
	parent.router = router(parent)
	return parent
}









module.exports = {
	map, 
	refreshPath
}


