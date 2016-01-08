/**
 * Webpack Prod Config
 */

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

function getJsxLoader() {
  return  { test: /\.jsx?$/
          , loaders: ['es3ify', 'babel']
          , exclude: /node_modules/
          }
}

function make(name) {
  return  { name
          , devtool: 'inline-source-map'
          , target: 'node'
          , cache: false
          , entry: './src/index'
          , resolve: { extensions: ['', '.jsx', '.js'] }
          , output: { libraryTarget: 'commonjs2'
                    , path: path.join(__dirname, 'lib')
                    , filename: 'index.js'
                    }
          , externals: [/^[a-z\-0-9]+$/] // fs.readdirSync('node_modules').map(module => `commonjs ${module}`)
          , plugins:  [ new webpack.optimize.OccurenceOrderPlugin(true) ]
          , module: { loaders: [ getJsxLoader() ] }
          }
}

module.exports = make('web')
