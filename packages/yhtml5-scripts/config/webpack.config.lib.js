
const path = require('path');
const { appPath, appSrc } = require('./paths');
const { webpackUglifyJsPlugin } = require('./webpack.plugins')
const projectConfig = require('./config');
// const isPro = process.env.NODE_ENV === 'production'

// console.log (process.env.NODE_ENV,'\n')

module.exports = {
    entry: projectConfig.entry,
    output: {
        path: path.resolve(appPath, projectConfig.outputPath),
        filename: (process.env.NODE_ENV !== 'production') ? '[name].min.js': '[name].js',
        // filename:  '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: ''
    },
    module: {
        strictExportPresence: true,
        rules: [{
            test: /\.(js|jsx|mjs)$/,
            enforce: 'pre',
            use: [],
            include: appSrc,
        }, {
            oneOf: [{
                test: /\.(js|jsx|mjs)$/,
                include: appSrc,
                loader: require.resolve('babel-loader'),
                options: {
                    // @remove-on-eject-begin
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
                    /** yhtml5 **/
                    plugins: [
                        // 'transform-runtime',
                    ],
                    /** yhtml5 **/
                    // @remove-on-eject-end
                    compact: true,
                },
            }, {
                loader: require.resolve('file-loader'),
                exclude: [/\.js$/, /\.html$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },],
        },],
    },
    plugins: [
      // process.env.NODE_ENV === 'production'&& webpackUglifyJsPlugin
    ]
};
