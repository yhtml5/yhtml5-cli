/**
 * Author: yhtml5
 * Description: the config of yhtml5-scripts
 *
 */

const path = require('path')

const webpackConfigAlias = {
  '^src(.*)$': path.resolve(__dirname, 'src$1'),
}

const config = {
  test: {
    testMatch: ['demo/__test__/**/*.js?(x)'],
    transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    moduleNameMapper: webpackConfigAlias,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
  }
}

module.exports = config

