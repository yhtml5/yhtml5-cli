/**
 * The config of yhtml5
 * TODO
 *
 */

const fs = require('fs');
const path = require('path');
const { isBeforePublish, appPath } = require('./utils/paths')

const hasConfigJs = fs.existsSync(path.resolve(appPath, './.config.js'))

isBeforePublish && console.log('\n.config.js', {
  isBeforePublish,
  "demo/.config.js": require('./demo/.config.js')
})

// config after publish: we're in ./node_modules/yhtml5-test/
const Config = isBeforePublish
  ? require('./demo/.config.js')
  : hasConfigJs
    ? require('../../.config.js')
    : {}

const { test = {} } = Config
const {
  testMatch = [],
  testPathIgnorePatterns = [],
  collectCoverageFrom = [],
  coveragePathIgnorePatterns = [],
  transformIgnorePatterns = [],
  moduleNameMapper = {},
} = test



const _testMatch = testMatch.map((value, index) => path.resolve(appPath, value))

module.exports = {
  testMatch: _testMatch,
  testPathIgnorePatterns,
  collectCoverageFrom,
  coveragePathIgnorePatterns,
  transformIgnorePatterns,
  moduleNameMapper
}
