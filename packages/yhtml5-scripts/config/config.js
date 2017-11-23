/**
 * Author: yhtml5
 * Description: The config of yhtml5-scripts
 * TODO:
 *
 */

const fs = require('fs');
const path = require('path');
const ownPackageJson = require('../package.json');

// const demoDirectory = 'demo/spa'
// const demoDirectory = 'demo/react-dashboard'
const demoDirectory = 'demo/2dfire-dashboard'

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
  fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();
const isPublish = reactScriptsLinked ||
  __dirname.indexOf(path.join('packages', ownPackageJson.name, 'config')) === -1

const hasConfigJs = fs.existsSync(path.resolve(
  appDirectory,
  isPublish ? '' : demoDirectory,
  '.config.js'
))

// isPublish || console.log('\n.config.js\n', {
//   reactScriptsPath,
//   reactScriptsLinked,
//   isPublish,
//   // 'fs.existsSync(reactScriptsPath)':fs.existsSync(reactScriptsPath),
//   // 'fs.lstatSync(reactScriptsPath).isSymbolicLink()':fs.lstatSync(reactScriptsPath).isSymbolicLink(),
//   'ownPackageJson.name': ownPackageJson.name,
//   // "__dirname.indexOf(path.join('packages', ownPackageJson.name, 'config')) === -1":__dirname.indexOf(path.join('packages', ownPackageJson.name, 'config')) === -1,
//   hasConfigJs
// })
// return

// config after publish: we're in ./node_modules/yhtml5-scripts/
function getConfig() {
  if (isPublish && hasConfigJs) {
    return require('../../../.config.js')
  } else {
    switch (demoDirectory) {
      case 'demo/react-dashboard':
        return require('../demo/react-dashboard/.config.js')
        break;
      case 'demo/2dfire-dashboard':
        return require('../demo/2dfire-dashboard/.config.js')
        break;
      case 'demo/spa':
        return require('../demo/spa/.config.js')
        break;
      default:
        return {}
        break;
    }
  }
}

// const config = isPublish
//   ? hasConfigJs
//     ? require('../../../.config.js')
//     : {}
//   : require('../demo/spa/.config.js')

const config = getConfig()
const {
  devPort = 9991,             // develop server port
  devHost = '0.0.0.0',        // develop server host, ['10.0.1.32', '0.0.0.0', null]
  isAnalyze = false,          // is turn on analyze module
  analyzerPort = 9992,        // analyze module report port
  host = '',                  // deploy server host, domain  ['', '.', 'yhtml5.com', null]
  // output path, receive a string type path, relative to the project root directory
  // you can customize your dynamic output directory, like:
  // const { getVersion } = require('yhtml5-dev-utils')
  // const outputPath = `dist/${getVersion(packageJson.version)}`
  outputPath = 'dist',
  // whether to customize the node environment
  // If this option is set to true, the node environment must be set
  // "build": "NODE_ENV=pre yhtml5-scripts build"
  isCustomNodeEnv = false,
  // The environment variables are embedded during the build time
  // Makes some environment variables available to the JS code,
  // the default process.env value is envVar.development,
  // the envVar['base'] environment variables will be merged by others
  // projectConfig.envVar[NODE_ENV] || projectConfig.envVar['development'] || {}
  // for example:
  // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
  envVar = {},
  // set app process.env.NODE_ENV to production when node running in custom node enviroment
  // only when isCustomNodeEnv === true, customAppEnvProds to work
  customAppEnvProds = [],
  // publicUrl  PUBLIC_URL
  // distributePort = 9993,
} = config

const roadhog = {
  "entry": "src/index.js",
  "disableCSSModules": false,
  "cssModulesExclude": [],
  "publicPath": "/",
  "outputPath": "./dist",
  "extraBabelPlugins": [],
  "extraPostCSSPlugins": [],
  "sass": false,
  "hash": false,
  "autoprefixer": null,
  "proxy": null,
  "externals": null,
  "library": null,
  "libraryTarget": "var",
  "multipage": false,
  "define": null,
  "env": null,
  "theme": null,
}


// hostname,
// port,
// version,
// title: '后台管理系统',
// analyzerPort: 9992,
// distributePort: 9993,
// webpackContext: '',
// domain: '',
// pages: [{
//   key: 'app',
//   name: 'app.html'
// }, {
//   key: 'login',
//   name: 'login.html'
// }]

// const _testMatch = testMatch.map((value, index) => path.resolve(appPath, value))

isPublish || console.log('\n.config.js\n', {
  isPublish,
  config,
  hasConfigJs
})

module.exports = {
  devHost,
  devPort,
  analyzerPort,
  isAnalyze,
  host,
  outputPath,
  envVar,
  customAppEnvProds,
  isCustomNodeEnv,
  demoDirectory
}
