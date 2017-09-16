/**
 * the config of yhtml5
 */

const { isBeforePublish } = require('./utils/paths')

// config after publish: we're in ./node_modules/yhtml5-test/
const Config = !isBeforePublish
  ? require('../../.config.js')
  : {}

const { test = {} } = Config
const { testMatch = [] } = test

module.exports = {
  testMatch
}
