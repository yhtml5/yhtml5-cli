/**
 * the config of yhtml5
 */
const path = require('path');
const { isBeforePublish, appPath } = require('./utils/paths')

// config after publish: we're in ./node_modules/yhtml5-test/
const Config = !isBeforePublish
  ? require('../../.config.js')
  : {}

const { test = {} } = Config
const { testMatch = [] } = test

const _testMatch = testMatch.map((value, index) => path.resolve(appPath, value))

module.exports = {
  testMatch: _testMatch
}
