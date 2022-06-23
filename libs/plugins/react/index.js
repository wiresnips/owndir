
const { resolve } = require("path")
const _ = require('lodash')



// for now, let's go with the 'function-call' method
// this is not even a LITTLE bit an API, but it DOES allow me to do whatever, while I figure out what things I might want to do
module.exports = function (root) {

	// if this isn't being applied to the root node, bail out now
	if (root.H.parent) {
		console.error('Attempted to apply react-plugin outside the root. react-plugin must be applied in the outermost .central')
		return;
	}

	// I need to create an 'engine' function 
	// http://expressjs.com/en/advanced/developing-template-engines.html

	// I need to pull that function into the app 
	// 	- some special-purpose key that gets picked up by index.js

	// I need to EITHER create my own template file (probably)
	// 	- how will this play with the build?
	// OR, I need to shortcircuit the Express View lookup (probably not)


	const templatePath = resolve(__dirname, 'template.html')


	// this shit goes FIRST
	root.H.middleware.unshift(
		['*', ['all',
			// shim res.render so we don't have to specify a template 
			function (req, res, next) {
				const context = nearestNode(req, this);

				// http://expressjs.com/en/api.html#res.render
				// res.render(view [, locals] [, callback])
				//    view: the template to render. almost certainly defaulted here
				//    locals: the values to template in
				//    callback: if included, 
				const origRender = res.render

				res.render = function (...args) {
					// if we are given a view, respect it - otherwise, use the default
					let view = _.isString(args[0]) 
						? args.shift() 
						: templatePath;

					// if the next arg exists and isn't a function, that's our locals
					let locals = args[0] && !_.isFunction(args[0]) 
						? args.shift() 
						: context;

					// if we are given a callback, respect it
					let callback = _.isFunction(args[0]) 
						? args.shift() 
						: null;

					return origRender(templatePath, context, callback)
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
	root.H.app.engine['react-plugin'] = engine


	// this part is less polite, mostly because I'm not sure how it could ever work otherwise -
	// express can only ever have one template directory, and I need my template to be in it
	// unless I'm going to copy myself into a user-established directory?
	root.H.app.set['view engine'] = 'react-plugin'
	root.H.app.set['views'] = __dirname
	
}



function engine () {

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

	

