/**
 * Author: yhtml5
 * Description: The config of yhtml5-scripts
 * TODO:
 */

const fs = require('fs');
const path = require('path');
const ownPackageJson = require('../package.json');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
  fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();
const isPublish = reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', ownPackageJson.name, 'config')) === -1

const hasConfigJs = fs.existsSync(path.resolve(appDirectory, 'demo/spa/.config.js'))

// config after publish: we're in ./node_modules/yhtml5-scripts/
const config = isPublish
  ? hasConfigJs
    ? require('../../../.config.js')
    : {}
  : require('../demo/spa/.config.js')

const {
  devPort = 9991,          // develop server port
  devHost = '0.0.0.0',     // develop server host, ['10.0.1.32', '0.0.0.0', null]
  host = '',               // deploy server host, domain  ['', '.', 'yhtml5.com', null]
  analyzerPort = 9992,
  distributePort = 9993,
 } = config

// hostname,
// port,
// version,
// title: '后台管理系统',
// origin: 'http://' + hostname + ':' + port,
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
  devHost,
  host,
  hasConfigJs
})

module.exports = {
  devHost,
  devPort,
  host,
}
