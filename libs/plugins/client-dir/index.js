const _ = require('lodash');
const qs = require('qs');

/*
TODO:
	
	normalize directory interface
		- client-dir vs directory.js

	route handlers:
		- handler to create new files
		- handler to update existing files
		- handler to delete files

	
	PERMISSIONS CONTROLS
		how will I indicate which files (if any) can be written/created/deleted ?

	PULL HANDLERS INTO INDIVIDUAL FUNCTIONS THAT CAN BE LAYERED 
		this way, a module can _very explicily_ opt in to non-read functionality

	explore streaming file data
		- errors? how do they work?
	
	implement lifecycle hooks so I can stop fucking around with setters

	
	I want updates to the underlying data to propagate automatically

		for example:
			- some file is updated in the server
			- H.directory object is updated to match
			- H.routes is updated to reflect new file content
			- folder's router is updated to reflect the new routes
			- client is updated (how?) to reflect the new file content
	
		This needs a LOT of consideration
*/



export async function (root) {

	// I don't actually know that this _needs_ to be done to the root - seems like everything *should* work at any level?
	// if this isn't being applied to the root node, bail out now
	// if (root.H.parent) {
	// 	console.error('Attempted to apply client-dir plugin outside the root. client-dir must be applied in the outermost .central')
	// 	return;
	// }

	// https://github.com/flexdinesh/browser-or-node/blob/master/src/index.js
	const isServerSide = (
		typeof process !== "undefined" &&
		process.versions != null &&
		process.versions.node != null
	);

	// on the server-side, I want routes that will expose the directory's contents
	// on the client-side, I want to use those routes to replicate the directory structure locally

	if (isServerSide) {
		injectRoutes(root);
	} 
	else {
		await fetch(`/?${qs.stringify({clientdir:'', depth:'all'})}`).then(async (response) => {
			if (!response.status === 200) {
				console.error('failed to initialize directory structure', {response})
			}

			const directory = await response.json();
			decorateClientDirectory(directory);
			injectClientDirectory(directory, root);
		})

	}
}


function decorateClientDirectory (directory, path) {
	path = path || [];

	_.toPairs(directory.children || {}).forEach(
		([name, dirChild]) => {
			const path = [...path, name]
			if (dirChild.isDirectory) {
				return decorateClientDirectory(child, path)
			}

			dirChild.read = opts => {
				opts = opts || {}
				opts.read = opts.read || ''
				return fetch(`/${path.join('/')}?${qs.stringify(opts)}`)
			}
		}
	)
}


function injectClientDirectory (directory, homestead) {
  if (!homestead) { return; }

  homestead.H.directory = directory;

  _.toPairs(directory.children || {}).forEach(
    ([name, dirChild]) => {
    	const hsChild = homestead.H.children[name];
    	if (hsChild) {
    		injectClientDirectory(dirChild, hsChild);
    	}
    }
  )
}








function injectRoutes (homestead) {

	// I don't want to add the middleware until _after_ the directory has been injected
	// because I need the directory to actually *be* there before I create the routes

	//	it looks like I can use this to get existing setter functions, which would mean that I can _wrap_ existing setter functions
	//		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor

	// a related path to consider is Proxy, which seems to allow me to trap all kinds of things ...
	//		https://stackoverflow.com/questions/2449182/getter-setter-on-javascript-array
	//		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

	Object.defineProperty(homestead.H, "directory", {
		get: function () { return this.directory; }, 
		set: function (newDir) {
			if (!this.routes) {
				this.routes = [];
			}
			
			// if there are already directory-routes, I want to remove and rebuild them
			this.routes = this.routes.filter(route => !route.isClientDirRoute);
			this.routes.push(directoryRoute(newDir));
		}
	})

	for (const child of homestead.H.children) {
		injectRoutes(child)
	}
}


const CLIENT_DIR_ATTRS = [
	'name', 
	'path',
	'absolutePath',
	'relativePath',
	'isFile',
	'isDirectory',
	'isSymbolicLink',
	'mtime',
	'ctime',
	'mode',
	'size',
	'mime',
]


function directoryRoute (dir, opts) {

	/*
		url query params:
			clientdir - if this is not set, we skip the request
			depth 		- if getting data, how many layers of descendents to recurse into?
									'all' for a complete traversal
									defaults to 0 (children will be enumerated but not explored)


			read 	- if this is set, we return file data, instead of the description
						- only applies to files

					see: https://nodejs.org/api/fs.html#filehandlecreatereadstreamoptions
					see: https://github.com/ljharb/qs

				read[encoding]	- default 'utf-8'
				read[start]			- default 0
				read[end]				- default Infinity
	*/

	async function readHandler (req, res, next) {
		if (!req.query.clientdir) {
			return next();
		}

		// notice:
		// 	if there is a target, it will **definitely** be for a file rather than a directory,
		// 	because if a directory is selected, that will be handled by THAT dir's routes, not ours
		
		const target = req.params.target 
			? dir.children[req.params.target]
			: dir;

		if (!target) {
			return res.sendStatus(404);
		}

		if (req.query.read && target.isFile) {
			if (_.isString(req.query.read)) {
				req.query.read = {}
			}
			req.query.read.encoding = req.query.read.encoding || 'utf-8'
			const readOpts = _.omit(req.query.read, ['autoClose', 'emitClose'])


			res.setHeader('Content-Type', target.mime);
			res.setHeader("Content-Length", target.size);

			const stream = await target.open().then(fd => fd.createReadStream(readOpts))
			stream.on('open', () => stream.pipe(res))

			// this needs some work, not sure what all's required here
			stream.on('error', (err) => {
				console.error(err);
				res.end();
			});
			return;
		}

		const depth = 
			!req.query.depth ? 0 :
			req.query.depth === 'all' ? Infinity :
			parseInt(req.query.depth);

		return res.json(summarize(target, depth))
	}

	async function createHandler () {}
	async function updateHandler () {} // https://github.com/google/diff-match-patch 
	async function deleteHandler () {}


	const handlers = [];

	if (opts?.allow?.read !== false) {
		handlers.push(['get', readHandler])
	}

	if (opts?.allow?.create) {
		handlers.push(['post', createHandler]);
	}

	if (opts?.allow?.update) {
		handlers.push(['put', updateHandler]);
	}

	if (opts?.allow?.delete) {
		handlers.push(['delete', deleteHandler]);
	}

	const route = ['(:target)?$', handlers];
	route.isClientDirRoute = true;

	return route;
}

function summarize (dirNode, maxDepth) {
	depth = _.isNumber(maxDepth) ? maxDepth : 0;
	const willContinue = (maxDepth--) > 0;

	const obj = _.pick(dirNode, CLIENT_DIR_ATTRS);

	if (dirNode.isDirectory) {
		obj.children = {};
		if (willContinue) {
			Object.keys(dirNode.children || {}).forEach(
				key => obj.children[key] = summarize(dirNode.children[key], maxDepth))
		} else {
			Object.keys(dirNode.children || {}).forEach(
				key => obj.children[key] = null)
		}
	}
	
	return obj;
}
