const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const webpackExtractPcssPlugin = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.pcss.css`)
const webpackExtractAntdCssPlugin = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.antd.css`)
const webpackExtractInInternalCssPlugin = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.internal.css`)
const webpackExtractExternalCssPlugin = new ExtractTextPlugin(`static/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.css`)

const pages = []
// console.log('pages', pages)
// return


// const webpackDefinePlugin = new webpack.DefinePlugin({
//   'process.env': {
//     'NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
//     'version': JSON.stringify(version),
//     'title': JSON.stringify(title)
//   },
//   'DEBUG': process.env.NODE_ENV !== 'production'
// })

// https://github.com/th0r/webpack-bundle-analyzer
const webpackAnalyzerPlugin = new BundleAnalyzerPlugin({
  analyzerMode: 'static', // [server,static,disabled]
  analyzerHost: '127.0.0.1',
  analyzerPort: config.analyzerPort,
  defaultSizes: 'parsed',// [stat,parsed,gzip]
  openAnalyzer: true,
  reportFilename: 'report/report.html',
  generateStatsFile: true,
  statsFilename: 'report/stats.json',
  statsOptions: null,
  logLevel: 'info' //['info','warn','error','silent']
})

const webpackUglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
    keep_fnames: true
  },
  compress: {
    warnings: false,
    screw_ie8: true,
  },
  comments: false
})

// extrct common chunks
const webpackCommonsChunkPlugin = {
  1: new webpack.optimize.CommonsChunkPlugin({
    children: true,
    async: true,
    minChunks: 2,
  }),
  2: new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
  })
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   // names: ["vendor", 'react'],
  //   // chunks: ["index", "react"],
  //   // filename: "vendor.js",
  //   minChunks: function (module) {
  //     return module.context && module.context.indexOf('node_modules') !== -1;
  //   },
  // }),
}

const webpackHtmlPlugins = pages.map((value, index) => {
  // console.log('content', paths.appPath)
  // console.log('paths', paths)

  const pagePath = path.resolve(paths.appPath, value.path)
  const pageDirectory = path.resolve(pagePath, '..')
  const pageName = pagePath.split(pageDirectory + '/')[1]

  console.log('')
  console.log('content', path.resolve(paths.appPath, value.path))
  console.log('content', paths.appHtmlTmplate)
  console.log('content', pageDirectory, pageName)
  console.log('')

  return new HtmlWebpackPlugin({
    filename: value.filename,
    title: value.title,
    key: value.key,
    // pageDirectory: pageDirectory,
    // pageName: pageName,
    // content: pagePath,
    // template: '../template/template.js',
    // favicon: './app/static/favicon.png',
    template: paths.appHtmlTmplate,
    chunks: ['index'],
    // excludeChunks: [''],
    inlineSource: '\.internal.css$', // embed all javascript and css inline
    chunksSortMode: 'dependency',
    hash: false,
    cache: true,
    minify: (process.env.NODE_ENV === 'production')
      ? {
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        trimCustomFragments: true
      }
      : () => null
  })
})

// new HtmlWebpackPlugin(
//   Object.assign({}, HtmlWebpackPluginParams, {
//     type: 'index',
//     chunks: ['index'],
//     // excludeChunks: [''],
//     filename: 'index.html',
//     inlineSource: '\.internal.css$', // embed all javascript and css inline
//     title: '前端开发丨张大漾',
//   })
// )

// new HtmlWebpackPlugin(
//   Object.assign({}, HtmlWebpackPluginParams, {
//     type: 'luyan',
//     chunks: ['index'],
//     // excludeChunks: [''],
//     filename: 'luyan.html',
//     // inlineSource: '.(js|css)$', // embed all javascript and css inline
//     title: '网页设计丨卢燕',
//   })
// )

const webpackHtmlPlugin = new HtmlWebpackPlugin({
  chunks: ['author', 'index', 'vendorReact', 'manifest'],
  // excludeChunks: [''],
  filename: 'index.html',
  template: path.resolve(__dirname, './template/template.js'),
  chunksSortMode: 'dependency',
  // title: title,
  hash: false,
  cache: true,
  favicon: './app/static/favicon.ico',
  minify: (process.env.NODE_ENV === 'production')
    ? {
      collapseWhitespace: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      trimCustomFragments: true
    }
    : () => null
})

const webpackContextReplacementPlugin = new webpack.ContextReplacementPlugin(
  /\*/, //resourceRegExp: RegExp,
  /\*/, //newContentResource?: string,
  //newContentRecursive?: boolean,
  //newContentRegExp?: RegExp
)

module.exports = {
  webpackAnalyzerPlugin,
  webpackCommonsChunkPlugin,
  // webpackDefinePlugin,
  webpackExtractPcssPlugin,
  webpackExtractAntdCssPlugin,
  webpackExtractInInternalCssPlugin,
  webpackExtractExternalCssPlugin,
  webpackHtmlPlugin,
  webpackHtmlPlugins,
  webpackUglifyJsPlugin,
  webpackContextReplacementPlugin,
}
