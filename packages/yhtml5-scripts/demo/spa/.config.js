/**
 * Author: yhtml5
 * Description: The configuration file for the yhtml5-scripts should not be packaged into the app
 *
 */

const path = require('path')

const config = {
  test: {
    testMatch: ['demo/__test__/**/*.js?(x)'],
    transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    moduleNameMapper: webpackConfigAlias,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
  }
}

module.exports = config

