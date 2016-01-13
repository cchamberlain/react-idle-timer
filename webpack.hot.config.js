/**
 * Webpack Prod Config
 */

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var babelQuery =  { presets:  [ 'es2015', 'stage-0', 'react'  ]
                  //, plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals']
                  }
var babelLoader = `babel?${JSON.stringify(babelQuery)}`

function getJsxLoader() {
  return  { test: /\.jsx?$/
          , loaders: ['es3ify', babelLoader]
          , exclude: /node_modules/
          }
}

const hotEntry = 'webpack-hot-middleware/client'
function make(name) {
  return  { name
          , devtool: 'inline-source-map'
          , target: 'node'
          , cache: false
          , entry:  { events: [ hotEntry, './src/events' ]
                    , index: [ hotEntry, './src/index' ]
                    }
          , resolve: { extensions: ['', '.jsx', '.js'] }
          , output: { libraryTarget: 'commonjs2'
                    , path: path.join(__dirname, 'lib')
                    , filename: '[name].js'
                    }
          , externals: [/^[a-z\-0-9]+$/] // fs.readdirSync('node_modules').map(module => `commonjs ${module}`)
          , plugins:  [ new webpack.optimize.OccurenceOrderPlugin(true)
                      , new webpack.HotModuleReplacementPlugin()
                      , new webpack.NoErrorsPlugin()
                      ]
          , module: { loaders: [ getJsxLoader() ] }
          }
}

module.exports = make('web')
