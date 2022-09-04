const _ = require('lodash')
const Router = require('express').Router

function makeRouter (homestead) {
	const router = Router()
	const {routes, children, middleware, directory} = homestead.H;

	applyRoutes(homestead, router, middleware)

	_.toPairs(children || {}).forEach(([key, child]) => {
		// console.log('adding router to', key)
		router.use(`/${key}`, makeRouter(child))
	})

	applyRoutes(homestead, router, routes)

	// if we are directly targetting a file, pass through to IT'S router last
	//_.toPairs(directory || {}).filter(([key, node]) => node && node.isFile).forEach(([key, node]) => {
	//	router.use(`/${key}`, fileRouter(node))
	//})

	return router
}


function applyRoutes (homestead, router, routes) {
	if (_.isArray(routes)) {
		routes.forEach(([path, ...methodHandlers]) => {
			methodHandlers.forEach(([method, ...handlers]) => {
				// console.log(homestead?.H?.directory?.path, path, method, handlers.toString())
				router[method](path, ...handlers.map(h => h.bind(homestead)))
			})
		})	
	}
}


module.exports = makeRouter