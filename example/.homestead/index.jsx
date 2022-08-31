

import React from 'react'
import ReactDOMServer from 'react-dom/server';

import lolfuck from 'mmmagic';

async function html (content) {
  return <html>
    <head>
      <meta charset="utf-8"/>
      <title></title>
    </head>
    <body>
      {content}
    </body>
  </html>
}


export default {
  html,

  lolfuck,

  H: {
    middleware: [
      ["*", 
        ["all", (req, res, next) => {
            console.log('root middleware', req.originalUrl)
            next()
          }
        ]
      ]
    ],
  }
}






