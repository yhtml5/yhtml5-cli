const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const config = require('./config')
const { basename, sep } = path

/**
 *
 * html-webpack-plugin:
 * https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md
 *
 * html-webpack-inline-source-plugin:
 * https://github.com/DustinJackson/html-webpack-inline-source-plugin
 * inlineSource: embed all javascript and css inline
 *
 * webpack-bundle-analyzer:
 * https://github.com/th0r/webpack-bundle-analyzer
 *
 * extract-text-webpack-plugin:
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const webpackExtractPcssPlugin = new ExtractTextPlugin(`static/css/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.pcss.css`)
const webpackExtractAntdCssPlugin = new ExtractTextPlugin(`static/css/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.antd.css`)
const webpackExtractInInternalCssPlugin = new ExtractTextPlugin(`static/css/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.internal.css`)
const webpackExtractExternalCssPlugin = new ExtractTextPlugin(`static/css/[name]${(process.env.NODE_ENV === 'production') ? '.[chunkhash:6]' : ''}.css`)

// const webpackDefinePlugin = new webpack.DefinePlugin({
//   'process.env': {
//     'NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
//     'version': JSON.stringify(version),
//     'title': JSON.stringify(title)
//   },
//   'DEBUG': process.env.NODE_ENV !== 'production'
// })

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
    // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
    // 数量必须大于等于2，或者少于等于 chunks的数量
    // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
    // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）
    // 数值越大, 公共包越小, 首次加载的量也越小, 对应其它模块包越大, 所有的包总和也越大
  }),
  2: new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    // minChunks: Infinity,
    // filename: 'manifest.js',
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


const webpackHtmlPlugins = ({ config = {} }) => {
  const { type = '', pages = [] } = config
  if (type !== 'MPA') { return [] }

  paths.isPublish || console.log('\nwebpack.plugins.js\n', {
    config,
  })

  return pages.map((value) => {
    const chunk = basename(value.template, '.js')
    const template = path.resolve(paths.appPath, value.template)

    return new HtmlWebpackPlugin({
      filename: chunk + '.html',
      title: value.title,
      template,
      chunks: [chunk, 'manifest'],
      chunksSortMode: 'dependency',
      inlineSource: '.(js|css)$', // embed all javascript and css inline
      // inject: true,
      // content: pages.content,
      // key: pages.key,
      // pageDirectory: pageDirectory,
      // pageName: pageName,
      // template: '../template/template.js',
      // favicon: './app/static/favicon.png',
      // excludeChunks: [''],
      // hash: false,
      // cache: true,
      minify: (process.env.NODE_ENV === 'production')
        ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
        : {}
    })
  })
}

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
  webpackHtmlInlineSourcePlugin: HtmlWebpackInlineSourcePlugin,
  webpackUglifyJsPlugin,
  webpackContextReplacementPlugin,
}
