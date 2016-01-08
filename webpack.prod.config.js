/**
 * Webpack Prod Config
 */

var path = require('path');
var webpack = require('webpack');

function getJsxLoader() {
  return  { test: /\.jsx?$/
          , loaders: ['es3ify', 'babel']
          , exclude: /node_modules/
          }
}

function make(name) {
  return  { name
          , devtool: 'inline-source-map'
          , target: name === 'web' ? 'web' : 'node'
          , cache: false
          , entry: './src/index'
          , resolve: { extensions: ['', '.jsx', '.js'] }
          , output: { libraryTarget: 'commonjs2'
                    , path: path.join(__dirname, 'lib')
                    , filename: name === 'web' ? 'browser.js' : 'index.js'
                    }
          , plugins:  [ new webpack.optimize.OccurenceOrderPlugin(true)
                      ].concat(name === 'web' ? [new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })] : [])
          , module: { loaders: [ getJsxLoader() ] }
          }
}

module.exports = [ make('node'), make('web') ]
