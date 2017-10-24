/**
 * Author: yhtml5
 * Description: The config of yhtml5-scripts
 * TODO:
 */

const fs = require('fs');
const path = require('path');
const { isPublish, appPath } = require('./paths')

const hasConfigJs = fs.existsSync(path.resolve(appPath, './.config.js'))

// config after publish: we're in ./node_modules/yhtml5-scripts/
const config = isPublish
  ? hasConfigJs
    ? require('../../../.config.js')
    : {}
  : require('../demo/spa/.config.js')

const {
  devPort = 9991,
  host = '0.0.0.0',
  analyzerPort = 9992,
  distributePort = 9993,
 } = config


// const _testMatch = testMatch.map((value, index) => path.resolve(appPath, value))

isPublish || console.log('\n.config.js\n', {
  isPublish,
})

module.exports = {
  host,
  devPort,
}
