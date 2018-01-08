
const path = require('path');
const { appPath } = require('./paths');
const { webpackUglifyJsPlugin } = require('./webpack.plugins')
const projectConfig = require('./config');

module.exports = {
  entry: projectConfig.entry,
  output: {
    path: path.resolve(appPath, projectConfig.outputPath),
    filename: '[name].min.js',
    chunkFilename: '[id].chunk.js',
    publicPath: ''
  },
  plugins: [
    webpackUglifyJsPlugin
  ]
};
