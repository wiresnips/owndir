const webpack = require('webpack')
const pathUtil = require("path")
// const fs = require('fs')
const fsp = require('fs/promises')
const os = require('os')


const HtmlWebpackPlugin = require('html-webpack-plugin');


const [target] = process.argv.slice(2)
const absTarget = pathUtil.resolve(__dirname, target)



const {withTempDir} = require('utils.js')


const config = {
  entry: absTarget, 
  mode: 'development',
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-react'] }
        }
      }
    ],
  }
}

const webConf = {
  ...config,
  plugins: [new HtmlWebpackPlugin()],
}

const nodeConf = {
  ...config,
  target: 'node'
}


withTempDir((outDir) => {
  webpack([{
    ...webConf, 
    output: {
      path: outDir,
      filename: 'central-web.js',
      library: 'central'
    }
  }, 
  {
    ...nodeConf, 
    output: {
      path: outDir,
      filename: 'central-node.js',
      libraryTarget: 'umd'
    }
  }], 

  (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('ERROR', err, stats)
    }

    if (stats.stats) {
      stats.stats.forEach(s => console.log(s))
    }
    else {
      console.log(stats)
    }

  });
})
/*
.then(() => {
  console.log('done')
  process.exit(0)
})
//*/
