const _ = require('lodash')
const fs = require('fs')
const pathUtil = require("path")
const chokidar = require('chokidar')


const directory = require('./directory.js')



// unicode symbols
const globe = '🌐';
const aquavitae = '🜉';




let dir = directory.map('./example')
// console.log(JSON.stringify(dir, null, 2))


// maybe I don't even want to ignore .central? Seems like there's no reason I can't hotload the code, right?
// solve that problem later, I think

// note that renaming a folder shotguns an even for every node in that folder's tree
const dirListener = chokidar.watch(dir.path, {ignored: '**/.central/**', ignoreInitial: true}).on('all', () => {

		dir = directory.refreshPath(dir, updatedPath)
		// console.log({event, updatedPath, args})
		// console.log('\n') console.log(JSON.stringify(dir, null, 2))
})




/*

this is really coming together
	I've got a reasonable directory traversal, 				<- this is what I'm calling the 'context', I think ...
	I've got a way to compile modules out of what I find	<- this is what I'm building the routers out of ...


so, the general plan is, I'm going to recurse down the directories, compiling AND MERGING DOWN the modules that I find

once I've done that, I will have a module for each directory

And so now, the idea is to transform each MODULE into an expressjs Router 

	- apply plugins
	- construct router
	

Hang on, though - do I actually WANT a formal router?
	I kinda feel like that isn't giving me the flexibility I'm looking for, right?
	as in, I've got no way to remove/reorder routes
	so, I probably need to roll my own solution, preferably meeting the same api

	

//*/



const express = require('express')
const app = express()
const port = 3000


// populate the path with segments for later
app.use((req, res, next) => {
	req.pathSegments = req.path.split('/').filter(s => !_.isEmpty(s))
	next()
})


app.all((req, res, next) => {

	// okay, let's get the node that'll be fielding the request
	const node = directory.get(dir, req.path)

	try {
		// should I do something with this?
		// node.central['.error']

		const routes = node.central['.routes'][req.method]

		// okay, so now what?

	} catch (exception) {
		// return a useful error?
	}
})


app.listen(3000)


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



