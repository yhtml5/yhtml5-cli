process.env.NODE_ENV = 'production'
require('shelljs/global')
const ora = require('ora')
const fs = require('fs');
const url = require('url');
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.pro.js')()

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

let spinnerSetting = ora('Program initialization')
spinnerSetting.start()
spinnerSetting.color = 'blue'
spinnerSetting.succeed()
spinnerSetting.stop()

// const appDirectory = fs.realpathSync(process.cwd())
// const pathResolve = path.resolve(__dirname)
// console.log('pathResolve: ', pathResolve)
// console.log('appDirectory: ', appDirectory)
// return

let spinnerWebpack = ora('Webpack for production...')

spinnerWebpack.start()
spinnerWebpack.color = 'blue'

// "prebuild":"clear",
// "build":"NODE_ENV=production  webpack --progress --hide-modules --colors --config build/webpack.pro.js",
// var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// rm('-rf', assetsPath)
// mkdir('-p', assetsPath)
// cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinnerWebpack.succeed()
  spinnerSetting.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    modules: false,
    progress: true,
  }) + '\n')
})
