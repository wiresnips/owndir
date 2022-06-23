

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

	H: {

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

