

import React from 'react'
import ReactDOMServer from 'react-dom/server';

async function html (content) {

	return `
<!doctype html>
<hmtl lang=en>
	<head>
		<meta charset=utf-8>
		<title></title>
	</head>
	<body>
		${
			ReactDOMServer.renderToStaticMarkup(content)
		}
	</body>
</html>
`
}



module.exports = {
	html,

	'.central': {

//*
		middleware: [
			["*", 
				["all", (req, res, next) => {
						console.log('root middleware', req.originalUrl)
						next()
					}
				]
			]
		],
//*/


	}
}






