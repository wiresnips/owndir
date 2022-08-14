



const fsp = require('fs/promises')
const { resolve, basename, extname } = require("path")
const applyToChildren = require('../../utils/apply-to-children').sync
const {isDir, isFile, getText} = require('../../utils/fs-utils')
const _ = require('lodash')



const TEMPLATE_FILE_PREFIX = '.homestead.template';

// if we put the template at the root, instead of in .H, we get the inheritance!
const TEMPLATE_ATTR = '__template'

function isTemplate (path) {
	return basename(path).startsWith(TEMPLATE_FILE_PREFIX)
}

async function loadTemplateFile (homestead) {
	const dir = homestead.H.directory
	if (!dir?.isDirectory) {
		return null;
	}

	const templateFiles = await fsp.readdir(dir.path)
		.then(relPaths => relPaths.filter(isTemplate))
		
	const moduleDir = resolve(dir.path, '.homestead')
	if (await isDir(moduleDir)) {
		await fsp.readdir(moduleDir)
			.then(relPaths => relPaths.filter(isTemplate))
			.then(relPaths => templateFiles.push(...relPaths))
	}

	const templatePaths = templateFiles.map(relPath => resolve(dir.path, relPath));
	for (const path of templatePaths) {
		const text = getText(path);
		const lang = extname(path);
		if (text && lang) {
			return { text, lang };
		}
	}
	return null;
}

async function initTemplate (homestead) {
	if (homestead.hasOwnProperty(TEMPLATE_ATTR)) {
		return;
	}
	const template = await loadTemplateFile(homestead)
}


module.exports = function (root) {

	// if this isn't being applied to the root node, bail out now
	if (root.H.parent) {
		console.error('Attempted to apply react-plugin-ssr outside the root. react-plugin-ssr must be applied in the outermost .homestead')
		return;
	}

	// make sure that these exist
	root.H.middleware = root.H.middleware || [];
	root.H.routes = root.H.routes || [];

	// if we pass this as the templatePath, it'll get picked up by our custom engine
	// and we'll use whatever the node has for us
	const HOMESTEAD_TEMPLATE = '.homestead.template.react-plugin-ssr'

	// this shit goes FIRST
	root.H.middleware.unshift(

		// this might be better handled by some kind of lifecycle hooks?
		// but, I don't like the naive implementation for now, feels VERY clumsy
		// so, I'll do this today, and re-evaluate tomorrow
		['*', ['all', 
			async function (req, res, next) {
				const homestead = nearestNode(req, this);
				if (!homestead[TEMPLATE_ATTR]) {
					await loadTemplate(homestead)
				}
				next();
			}
		]],

		['*', ['all',
			// shim res.render so we don't have to specify a template 
			function (req, res, next) {
				const homestead = nearestNode(req, this);

				// http://expressjs.com/en/api.html#res.render
				// res.render(viewPath [, viewValues] [, callback])
				const origRender = res.render

				res.render = function (...args) {
					// if we are given a view, respect it - otherwise, defer to the node's template
					let templatePath = _.isString(args[0]) 
						? args.shift()
						: HOMESTEAD_TEMPLATE;

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
	root.H.app.engine['react-plugin-ssr'] = engine
}


// for the sake of flexibility, I need to EITHER
// 		1- figure out some kind of BYO for template engines,
// 		2- just require _every_ template engine

// but, for now, I should just pick ONE and prove that _anything_ works
// so, I've directly installed mustache: https://github.com/janl/mustache.js


function engine (templatePath, templateValues, callback) {
	// this is an extremely simple template engine
	fs.readFile(templatePath, (err, content) => {
		if (err) {
			return callback(err)
		}
		const rendered = templateEngine.render()
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

	

