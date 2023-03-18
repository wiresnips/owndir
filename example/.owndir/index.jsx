

import React from 'react'
import { Helmet } from 'react-helmet'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default {

  frame: function () {
    const dir = this.directory

    return <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{this.title}</title>
        <link rel="stylesheet" type="text/css" href={`${dir.path}/style.css`} /> 
      </Helmet>

      <CssBaseline />

      <Box display='flex' flexDirection='row' height="100%">
        <this.sideNav />
        <Box flexGrow="999">
          {this.main()}
        </Box>
      </Box>
    </>
  },

  title: "OwnDir CSR root",

  main: () => {},
}


