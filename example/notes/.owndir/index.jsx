import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

module.exports = {
	//*
	main: function () {
		const localPrefix = this.O.directory.relativePath;
		const path = window.location.pathname.slice(localPrefix.length);

		const fsNode = this.O.directory.walk(path);
		if (fsNode?.isFile) {
			return <Markdown fsNode={fsNode} />
		}

		const {children} = this.O.directory;
		const fileNames = Object.keys(children).sort();
		return <ul>{fileNames.map(name => (<li><Link to={localPrefix + '/' + name}>{name}</Link></li>))}</ul>
	},
	// */

	O: {
		middleware: [
			["*", 
				["all", function (req, res, next) {
					next()
				}]
			]
		],

	}
}

function Markdown ({fsNode}) {
	const [text, setText] = React.useState(null);
	React.useEffect(() => {
		fsNode.text().then(setText)
	}, [fsNode])
	return <ReactMarkdown>{text}</ReactMarkdown>
}