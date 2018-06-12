/**
 * Author: yhtml5
 * Description: The configuration file for the yhtml5-scripts should not be packaged into the app
 * Notice: when this file changes, you should rerunning scripts
 */
const packageJson = require('./package.json')
const { getVersion } = require('yhtml5-dev-utils')
const outputPath = `dist2/${packageJson.version}`
// const outputPath = `dist2/${getVersion(packageJson.version)}`

const config = {
  entry: {
    utils:'./src/index.js', 
  },
  outputPath: outputPath,
  // devHost: '0.0.0.0',
  // devPort: 9991,
  // isAnalyze: true,
  // analyzerPort: 9992,
  // envVar: envVar,
  // host: './',
  // type: 'MPA',
  // distributePort: 9993,
  test: {
    // testMatch: ['demo/__test__/**/*.js?(x)'],
    // transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    // moduleNameMapper: webpackConfigAlias,
    // collectCoverageFrom: ['src/**/*.{js,jsx}'],
  }
}

module.exports = config

