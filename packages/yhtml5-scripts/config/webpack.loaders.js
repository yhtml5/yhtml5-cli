const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const { webpackExtractPcssPlugin, webpackExtractInInternalCssPlugin, webpackExtractExternalCssPlugin, webpackExtractAntdCssPlugin } = require('./webpack.plugins')
const paths = require('./paths');

/************ html loader  ***********/
const htmlLoader = {
  test: /\.(yhtml|html)$/,
  use: [{
    loader: 'html-loader',
    // options: {
    //     root: resolve(__dirname, 'src'),
    //     attrs: ['img:src', 'link:href']
    // }
  }]
}

const markdownLoader = {
  test: /\.md$/,
  use: [
    {
      loader: "html-loader"
    },
    {
      loader: "markdown-loader",
      options: {
        // highlight: function (code) {
        //   return require('highlight').highlightAuto(code).value;
        // }
        //pedantic: true,
        //renderer
      }
    }
  ]
}

/************ js loader  ***********/


/******* css loader  ******/
const pcssLoader = {
  test: /\.pcss$/,
  exclude: /node_modules/,
  use: webpackExtractPcssPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        minimize: process.env.NODE_ENV === 'production',
        localIdentName: (process.env.NODE_ENV === 'production') ? '[local]-[hash:base64:6]' : '[path][name]-[local]',
        camelCase: true,
        sourceMap: false,
        // importLoaders: 1,
      }
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('postcss-smart-import')({/* ...options */ }),
          require('precss')({/* ...options */ }),
          require('autoprefixer')({/* ...options */ })
        ]
      }
    }]
  })
}

const cssInternalLoader = {
  test: /\.css$/,
  exclude: /\.internal.css$/,
  use: webpackExtractExternalCssPlugin.extract({
    fallback: "style-loader",
    use: [{
      loader: 'css-loader',
      options: {
        modules: false,
        minimize: process.env.NODE_ENV === 'production',
        sourceMap: false,
        plugins: function () {
          require('autoprefixer')({/* ...options */ })
        }
      }
    }]
  })
}

const cssExternalLoader = {
  test: /\.internal.css$/,
  use: webpackExtractInInternalCssPlugin.extract({
    fallback: "style-loader",
    use: [{
      loader: 'css-loader',
      options: {
        modules: false,
        minimize: process.env.NODE_ENV === 'production',
        sourceMap: false,
        plugins: function () {
          require('autoprefixer')({/* ...options */ })
        }
      }
    }]
  })
}

const antdCssLoader = {
  test: /\.css$/,
  include: /antd/, //[path.resolve(__dirname, "../node_modules/antd")],
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      modules: false,
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: false,
    }
  }]
}

/******* files loader  ******/

// {
//   test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
//   exclude: /favicon\.ico/,
//   use: [{
//     loader: 'url-loader',//https://github.com/webpack/file-loader
//     options: {
//       name: '[name].[hash:6].[ext]',
//       limit: 5000,
//       outputPath: 'static/img/',
//       publicPath: '',//works when you just want to prefix the name with a directory
//     }
//   }]
//}

const imageLoader = {
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[name].[hash:6].[ext]',
        limit: 1000,
        outputPath: 'static/img/',
      }
    }, {
      loader: 'image-webpack-loader',
      options: {
        gifsicle: {
          interlaced: false,
        },
        optipng: {
          optimizationLevel: process.env.NODE_ENV === 'production' ? 7 : 1,
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        mozjpeg: {
          progressive: true,
          quality: 65
        }
      }
    }
  ]
}
const fontLoader = {
  test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
  exclude: /favicon\.ico/,
  use: [{
    loader: 'url-loader',//https://github.com/webpack/file-loader
    options: {
      name: '[name].[hash:6].[ext]',
      limit: 1000,
      outputPath: 'static/img/',
      publicPath: '',//works when you just want to prefix the name with a directory
    }
  }]
}


module.exports = {
  htmlLoader,
  markdownLoader,
  imageLoader,
  fontLoader,
  antdCssLoader,
  pcssLoader,
  cssInternalLoader,
  cssExternalLoader
}
