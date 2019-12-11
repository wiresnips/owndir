



var argparser = require("argparse").ArgumentParser({
	description: "Coming soon to a knowing-what-the-fuck-this-is near you!"
})

argparser.addArgument("dir", {
	type: "string"
})



var args = argparser.parseArgs()

console.log(args)

