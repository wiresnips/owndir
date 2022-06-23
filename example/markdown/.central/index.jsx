

// we should be getting this from the root
// const frame = (content) => `<!doctype html><hmtl lang=en><head><meta charset=utf-8><title></title></head><body>${content}</body></html>`



import React from 'react'
import ReactMarkdown from 'react-markdown';

// we *can* send the answer directly, 
// but we're *expecting* to just return a JSX element
async function content (req) {
	const text = req.file && await req.file.text()
	if (text) {
		return <ReactMarkdown>{text}</ReactMarkdown>
	}
	return null
}

module.exports = {
	content,

	C: {

		middleware: [
			["*", 
				["all", (req, res, next) => {
					console.log('child middleware', req.originalUrl)
					next()
				}]
			]
		],

		routes: [
			["*", ["all", async function (req, res, next) {

				res.send(await this.html(await content(req)))

			}]]
		],
	}
}


/*

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt();

async function render (req, res, next) {
	try {
		
		// any of these works to get my hands on the extended properties
		// const central = req.context['.central']
		// const central = self['.central']
		// const central = central
		const central = module.exports['.central']
		const directory = central.directory

		const filename = req.path.slice(1)
		const handle = await directory.children[filename].open()
		const content = await handle.readFile('utf-8')
		handle.close()

		res.send(frame(md.render(content)))
	} catch (err) {
		console.log(err)
		next()
	}
}

const central = {
	routes: [
		['*.md', [['get', render]]]
	],
	middleware: [
		["*", ["all", [(req, res, next) => {
			console.log('BOOM', req)
			next()
		}]]]
	]
}

const self = { '.central': central }

module.exports = self

*/