

import React from 'react'
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet'
import {resolve} from 'path'

export default {

  frame: async function () {
    const dir = this.O?.directory

    return <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{this.title}</title>
        <link rel="stylesheet" type="text/css" href={resolve('/', dir?.relativePath, 'style.css')} /> 
      </Helmet>

      Hello, from { dir?.absolutePath }
      { await this.main() }
      <this.fileNavSidebar />
    </div>
  },

  title: "OwnDir CSR root",

  main: () => {},
}


