

import React from 'react'
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet'

export default {

  body: async function () {

    return <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{this.title}</title>
        <link rel="stylesheet" type="text/css" href="/style.css" /> 
      </Helmet>

      Hello, from { this.O?.directory?.absolutePath }
      { await this.main() }
      <this.fileNavSidebar />
    </div>
  },

  title: "OwnDir CSR root",

  main: () => {},
}


