const _ = require('lodash')
const fs = require('fs')
const pathUtil = require("path")
const babel = require("@babel/core");


// https://pwnisher.gitlab.io/nodejs/sandbox/2019/02/21/sandboxing-nodejs-is-hard.html
// const vm = require('vm')
// const req = require('require-like')

const requireFromString = require('require-from-string');


module.exports = function compile (path) {

	try {
		// okay, the path is going to end at '.central', which will EITHER be a javascript file,
		// OR will be a folder containing 'index.js'

		// later on, when we prove this out, we can try to expand the range a little
		// but for now, this is fine

		path = pathUtil.resolve(path)
		if (!fs.existsSync(path)) {
			return {}
		}

		const stat = fs.statSync(path)
		if (stat.isDirectory()) {
			path = pathUtil.resolve(path, 'index.js')
		}

		if (!fs.existsSync(path)) {
			return {}
		}

		const babelOpts = {
			cwd: pathUtil.dirname(path),
			targets: { node: "current" },
			presets: [
				['@babel/preset-react']
			],
			plugins: [
				"@babel/plugin-transform-modules-commonjs"
			]
		}

		const rawCode = fs.readFileSync(path, 'utf8')
		const code = babel.transformSync(rawCode, babelOpts).code
		return requireFromString(code, path)
	}
	catch (error) {

		// https://riptutorial.com/javascript/example/14972/formatting-console-output
		// https://developer.mozilla.org/en-US/docs/Web/API/Console/group

		console.group(`Error compiling ${path}:`)
		console.error(error)
		console.groupEnd()
		return {}
	}
}
