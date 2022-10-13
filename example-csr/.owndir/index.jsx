

import React from 'react'
import { renderToString } from 'react-dom/server';


export default {

  html: async function (req) {
    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>{this.title}</title>
          <link rel="stylesheet" type="text/css" href="/style.css" /> 
        </head>
        <body>
          Hello, from { this.O?.directory?.absolutePath }
          { await this.main(req) }
          { await this.fileNavSidebar() }
        </body>
      </html>
    );
  },

  title: 'root OwnDir',
  main: (req) => {},
}



