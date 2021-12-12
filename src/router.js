const _ = require('lodash')
const Router = require('express').Router

function makeRouter (context) {
	
	const router = Router()
	const {routes, children, middleware} = context['.central'];

	// this is a good candidate for a middleware plugin
	router.use((req, res, next) => {
		const directory = context['.central'].directory
		const target = directory.children && directory.children[req.path.slice(1)]
		if (target && target.isFile) {
			req.file = target
		}
		next();
	})

	applyRoutes(context, router, middleware)

	_.toPairs(children || {}).forEach(([key, child]) => {
		console.log('adding router to ', key)
		router.use(`/${key}`, makeRouter(child))
	})

	applyRoutes(context, router, routes)

	return router
}


function applyRoutes (context, router, routes) {
	if (_.isArray(routes)) {
		routes.forEach(([path, ...methodHandlers]) => {
			methodHandlers.forEach(([method, ...handlers]) => {
				console.log('adding handlers to', path, method, handlers)
				router[method](path, ...handlers.map(h => h.bind(context)))
			})
		})	
	}
}

module.exports = makeRouter