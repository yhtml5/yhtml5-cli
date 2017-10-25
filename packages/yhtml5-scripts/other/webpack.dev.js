const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')
const { port } = require('./config')()

module.exports = function () {
  return webpackMerge(commonConfig(), {
    output: {
      publicPath: '/',
      sourceMapFilename: '[name].map'
      // pathinfo: true,
    },
    devtool: 'inline-source-map',
    devServer: {
      port: port,
      hot: true,
      inline: true,
      publicPath: '/',
      quiet: false,
      watchContentBase: false,
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',
    },
    performance: {
      hints: false
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally
      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NoEmitOnErrorsPlugin(),
    ]
  })
}
