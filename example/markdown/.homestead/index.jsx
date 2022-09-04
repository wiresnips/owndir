import React from 'react'
import ReactMarkdown from 'react-markdown';


module.exports = {
	main: async function (req) {
		const fsNode = this.H.directory.root.walk(req.path);
		if (!fsNode) {
			return null;
		}
		if (fsNode.isFile) {
			return <ReactMarkdown>{await fsNode.text()}</ReactMarkdown>
		}

		const {children} = this.H.directory;
		const fileNames = Object.keys(children).sort();
		return <ul>{fileNames.map(name => (<li>{name}</li>))}</ul>
	},

	H: {

		middleware: [
			["*", 
				["all", function (req, res, next) {
					console.log('child middleware', req.originalUrl, this)
					next()
				}]
			]
		],

	}
}

