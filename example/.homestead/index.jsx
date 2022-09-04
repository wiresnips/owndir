

import React from 'react'
import { renderToString } from 'react-dom/server';


export default {

  html: async function (req) {
    console.log("html", this)

    return (
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>{this.title}</title>
        </head>
        <body>
          Hello, from { this.H?.directory?.absolutePath }
          { await this.main(req) }
        </body>
      </html>
    );
  },

  title: 'root homestead',
  main: (req) => {},

  /*
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
  //*/
}

