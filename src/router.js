const _ = require('lodash')
const Router = require('express').Router

function makeRouter (spec, owndir) {
	const router = Router()
	applyRoutes(router, spec, owndir)
	router.signature = signature(spec)
	return router;
}

function signature (spec) {
	return JSON.stringify(spec, (k, v) => _.isFunction(v) ? v.toString() : v);	
} 

function applyRoutes (router, spec, owndir) {
	if (_.isArray(spec)) {
		spec.forEach(([path, ...methodHandlers]) => {
			methodHandlers.forEach(([method, ...handlers]) => {
				// console.log(owndir?.O?.directory?.path, path, method, handlers.toString())
				router[method](path, ...handlers.map(h => h.bind(owndir)))
			})
		})	
	}
}


module.exports.Router = makeRouter
module.exports.routesStr = signature