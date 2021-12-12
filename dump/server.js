const _ = require('lodash')
const fs = require('fs')
const fsp = require('fs/promises')
const pathUtil = require("path")



// unicode symbols that I like
const globe = '🌐';
const ledger = '🕮';


var args = (require('yargs/yargs')(process.argv.slice(2))
	.option('p', {
		alias: 'port',
		default: 3232,
		type: 'integer'
	})
	.argv);

// there's probably a better way to establish a name and validation for an anonymous arg, but damned if I was able to figure out what it is
const path = pathUtil.resolve(_.last(args._))
if (!fs.existsSync(path)) {
	console.log(`unable to resolve path <${path}>`)
	process.exit(0)
}

if (!fs.statSync(absPath).isDirectory()) {
	console.log(`${path} is not a directory`)
	process.exit(0)
}
args.path = path

















const root = directory.map(args.path)
const router = directory.router(root)

const express = require('express')
const app = express()

app.all((req, res, next) => router(req, res, next))
// app.use((req, res, next) => res.send(req.context.render(req.context)))

app.listen(args.port)


/*

	a router is just a function, you can call it:

		app.all('*', (req, res, next) => {
			yourFancyRouter(req, res, next)
		}	

	

	Okay, that's a reasonable answer to the first half of my dynamic routing problem

	if I want middleware to cascade correctly 
		(I'm assuming that I'll figure out how to incorporate middleware at some point)

	then it'd be convenient to actually have the routers `use` each other

	Presumably, then, I can cascade this all the way down? Yeah, that sounds about right ....

*/









/*
const chokidar = require('chokidar')

// maybe I don't even want to ignore .central? Seems like there's no reason I can't hotload the code, right?
// solve that problem later, I think

// note that renaming a folder shotguns an event for every node in that folder's tree
const dirListener = chokidar.watch(dir.path, {ignored: '**/.central/**', ignoreInitial: true}).on('all', () => {

		dir = directory.refreshPath(dir, updatedPath)

		// console.log({event, updatedPath, args})
		// console.log('\n') console.log(JSON.stringify(dir, null, 2))
})
*/


