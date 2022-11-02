

import React from 'react'
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet'
import {resolve} from 'path'

export default {

  frame: function () {
    const dir = this.O?.directory

    return <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{this.title}</title>
        <link rel="stylesheet" type="text/css" href={resolve('/', dir?.relativePath, 'style.css')} /> 
      </Helmet>

      <div>
        { this.fileNav() }
      </div>

      <div>
        Hello, from { dir?.absolutePath }
        { this.main() }
      </div>


    </div>
  },

  title: "OwnDir CSR root",

  main: () => {},
}


