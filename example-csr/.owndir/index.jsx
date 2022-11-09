

import React from 'react'
import { Helmet } from 'react-helmet'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default {

  frame: function () {
    const dir = this.O?.directory

    return <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{this.title}</title>
        <link rel="stylesheet" type="text/css" href={`${dir?.relativePath}/@/style.css`} /> 
      </Helmet>

      <CssBaseline />

      <Box display='flex' flexDirection='row'>
        <this.sideNav />
      </Box>

    </div>
  },

  title: "OwnDir CSR root",

  main: () => {},
}


