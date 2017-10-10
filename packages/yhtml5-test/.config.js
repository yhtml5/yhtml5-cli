/**
 * The config of yhtml5
 * TODO
 * 
 */

const fs = require('fs');
const path = require('path');
const { isBeforePublish, appPath } = require('./utils/paths')

const hasConfigJs = fs.existsSync(path.resolve(appPath, './.config.js'))

// config after publish: we're in ./node_modules/yhtml5-test/
const Config = !isBeforePublish
  ? hasConfigJs
    ? require('../../.config.js')
    : {}
  : {}

const { test = {} } = Config
const {
  testMatch = [],
  transformIgnorePatterns = [],
  collectCoverageFrom = [],
  moduleNameMapper = {}
} = test

const _testMatch = testMatch.map((value, index) => path.resolve(appPath, value))

module.exports = {
  testMatch: _testMatch,
  transformIgnorePatterns,
  collectCoverageFrom,
  moduleNameMapper
}
