const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const { webpackExtractPcssPlugin, webpackExtractInInternalCssPlugin, webpackExtractExternalCssPlugin, webpackExtractAntdCssPlugin } = require('./webpack.plugins')
const paths = require('./paths');

/**
 *
 * css module:
 * https://github.com/css-modules/css-modules
 *
 * html-loder:
 * https://github.com/webpack-contrib/html-loader
 *
 * style-loader:
 * https://doc.webpack-china.org/loaders/style-loader
 *
 * css-loader:
 * https://doc.webpack-china.org/loaders/css-loader/#camelcase
 *
 */

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
const styleLoadersOptions = {
  // loader: require.resolve('style-loader'),
  loader: 'style-loader',
  options: {
    hmr: process.env.NODE_ENV === 'development',
  }
}

const cssLoaderOptions = {
  loader: 'css-loader',
  options: {
    // 启用/禁用 CSS 模块, 默认 false
    modules: true,
    // 类名将被骆驼化
    camelCase: true,
    // generate source map
    sourceMap: false,
    // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
    importLoaders: 1,
    minimize: process.env.NODE_ENV === 'production',
    localIdentName: (process.env.NODE_ENV === 'production') ? '[local]-[hash:base64:6]' : '[path][name]-[local]',
  }
}

const pcssLoaderOptions = {
  loader: 'postcss-loader',
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-smart-import')({/* ...options */ }),
      require('precss')({/* ...options */ }),
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
}

const pcssLoader = {
  test: /\.pcss$/,
  exclude: /node_modules/,
  include: /\.pcss$/,
  exclude: /\.css$/,
  use: process.env.NODE_ENV === 'production'
    ? webpackExtractPcssPlugin.extract({
      fallback: styleLoadersOptions,
      use: [cssLoaderOptions, pcssLoaderOptions]
    })
    : [
      styleLoadersOptions,
      cssLoaderOptions,
      pcssLoaderOptions,
    ]
}

const cssInternalLoader = {
  test: /\.internal.css$/,
  use: [{
    loader: "style-loader",
    options: {
      // hmr: false
      // attrs: { id: 'id' }
      // insertAt: 'top'
      singleton: true,
      sourceMap: false
    }
  }, {
    loader: 'css-loader',
    options: {
      modules: true,
      minimize: process.env.NODE_ENV === 'production',
    }
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        require('postcss-smart-import')({/* ...options */ }),
        require('precss')({/* ...options */ }),
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
        }),
      ],
    },
  }],
}

// const cssExternalLoader = {
//   test: /\.external.css$/,
//   use: webpackExtractInInternalCssPlugin.extract({
//     fallback: "style-loader",
//     use: [{
//       loader: 'css-loader',
//       options: {
//         modules: false,
//         minimize: process.env.NODE_ENV === 'production',
//         sourceMap: false,
//         plugins: function () {
//           require('autoprefixer')({/* ...options */ })
//         }
//       }
//     }]
//   })
// }

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
  // cssExternalLoader
}
