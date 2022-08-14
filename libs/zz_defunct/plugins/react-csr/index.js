
const { resolve } = require("path")
const _ = require('lodash')


/*
	Okay, what's THIS roadmap look like?

	how do we integrate the context with the template, _exactly_ ?

		1- like with client-dir, we need to check whether we're in the client or the server
		2- if we're in the CLIENT, we need to queue up some code that will RUN on page load
		
			ReactDOM.render(
				<SomeDefinedRootComponent />,
				document.createElement('div')
			)

		3- some kind of utility to establish a router that can navigate the tree
//*/



// for now, let's go with the 'function-call' method
// this is not even a LITTLE bit an API, but it DOES allow me to do whatever, while I figure out what things I might want to do
module.exports = function (root) {

	// if this isn't being applied to the root node, bail out now
	if (root.H.parent) {
		console.error('Attempted to apply react-plugin outside the root. react-plugin must be applied in the outermost .homestead')
		return;
	}

	// I need to create an 'engine' function 
	// http://expressjs.com/en/advanced/developing-template-engines.html

	// I need to pull that function into the app 
	// 	- some special-purpose key that gets picked up by index.js

	// I need to EITHER create my own template file (probably)
	// 	- how will this play with the build?
	// OR, I need to shortcircuit the Express View lookup (probably not)


	const defaultTemplatePath = resolve(__dirname, 'template.html')


	// this shit goes FIRST
	root.H.middleware.unshift(
		['*', ['all',
			// shim res.render so we don't have to specify a template 
			function (req, res, next) {
				const homestead = nearestNode(req, this);

				// http://expressjs.com/en/api.html#res.render
				// res.render(viewPath [, viewValues] [, callback])
				const origRender = res.render

				res.render = function (...args) {
					// if we are given a view, respect it - otherwise, use the default
					let templatePath = _.isString(args[0]) 
						? args.shift() 
						: defaultTemplatePath;

					// if the next arg exists and isn't a function, that's our locals
					let templateValues = args[0] && !_.isFunction(args[0]) 
						? args.shift() 
						: homestead;

					// if we are given a callback, respect it
					let callback = _.isFunction(args[0]) 
						? args.shift() 
						: null;

					return origRender(templatePath, templateValues, callback)
				}
				next();
			}
		]]
	)

	// don't replace anything, but make sure we have a basic app config set up
	root.H.app = root.H.app || {}
	root.H.app.engine = root.H.app.engine || {}
	root.H.app.set = root.H.app.set || {}

	// and, inject ourselves into the app
	root.H.app.engine['react-plugin-csr'] = engine


	// this part is less polite, mostly because I'm not sure how it could ever work otherwise -
	// express can only ever have one template directory, and I need my template to be in it
	// unless I'm going to copy myself into a user-established directory?
	root.H.app.set['view engine'] = 'react-plugin'
	root.H.app.set['views'] = __dirname

	// and, we _do_ want to serve client.js
	root.H.serveClientJsAt = '/.homestead.js';
	
}



function engine (templatePath, templateValues, callback) {
	// this is an extremely simple template engine
	fs.readFile(filePath, (err, content) => {
	if (err) return callback(err)
	return callback(null, content)
  })
}




// I feel like this is going to get repeated a lot ... 
function nearestNode (req, node) {
	const path = req.path.split('/').filter(step => step && step.length)

	for (let step of path) {
		let children = node.H.children
		let child = children && children[step]

		if (!child) {
			break;
		}

		node = child;
	}
	return node
}

	

