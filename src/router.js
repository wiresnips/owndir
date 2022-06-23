const _ = require('lodash')
const Router = require('express').Router

function makeRouter (homestead) {
	const router = Router()
	const {routes, children, middleware, directory} = homestead.H;

	// this is a good candidate for a middleware plugin
	router.use((req, res, next) => {
		const target = homestead.H?.directory?.children?.[req.path.slice(1)]
		if (target && target.isFile) {
			req.file = target
		}
		next();
	})

	applyRoutes(homestead, router, middleware)

	_.toPairs(children || {}).forEach(([key, child]) => {
		console.log('adding router to ', key)
		router.use(`/${key}`, makeRouter(child))
	})

	applyRoutes(homestead, router, routes)

	// if we are directly targetting a file, pass through to IT'S router last
	console.log({directory, pairs: _.toPairs(directory || {})})
	_.toPairs(directory || {}).filter(([key, node]) => node && node.isFile).forEach(([key, node]) => {
		router.use(`/${key}`, fileRouter(node))
	})

	return router
}


function applyRoutes (homestead, router, routes) {
	if (_.isArray(routes)) {
		routes.forEach(([path, ...methodHandlers]) => {
			methodHandlers.forEach(([method, ...handlers]) => {
				console.log('adding handlers to', path, method, handlers)
				router[method](path, ...handlers.map(h => h.bind(homestead)))
			})
		})	
	}
}


module.exports = makeRouter