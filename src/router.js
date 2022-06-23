const _ = require('lodash')
const Router = require('express').Router

function makeRouter (context) {
	const router = Router()
	const {routes, children, middleware, directory} = context.C;

	// this is a good candidate for a middleware plugin
	router.use((req, res, next) => {
		const target = context.C?.directory?.children?.[req.path.slice(1)]
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

	// if we are directly targetting a file, pass through to IT'S router last
	console.log({directory, pairs: _.toPairs(directory || {})})
	_.toPairs(directory || {}).filter(([key, node]) => node && node.isFile).forEach(([key, node]) => {
		router.use(`/${key}`, fileRouter(node))
	})

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





// create an express router that allows a file to be interacted with
function fileRouter (node) {
  if (!node.isFile) {
    return null;
  }
  const router = Router();

  router.get('/', (req, res, next) => {
    if (node.mime?.contentType) {
      response.setHeader('Content-Type', node.mime?.contentType)
    }
    fs.createReadStream(node.path).pipe(response)
  })


  

  /*
  // lol. Let's set off every red flag that I have, all at once, shall we?

  router.put('/', (req, res, next) => {
    // use fs to replace the content of the file
    // maybe check stat.mode first, to make sure the file isn't executable
    next();
  })

  router.patch('/', (req, res, next) => {
    // this seems like a neat idea, not sure how to actually DO it ...
    next();
  })

  router.post('/', (req, res, next) => {
    // maybe a away to _append_ ?
    next();
  })

  router.delete('/', (req, res, next) => {
  	next();
  })
  //*/

  return router;
}






module.exports = makeRouter