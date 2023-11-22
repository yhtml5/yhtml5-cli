/**
 * Author: yhtml5
 * Description: The configuration file for the yhtml5-scripts should not be packaged into the app
 *
 */
const packageJson = require('./package.json')
const { getVersion } = require('yhtml5-dev-utils')
const outputPath = `dist/${getVersion(packageJson.version)}`

const envVar = {
  base: {
    APP_TITLE: '2d前端'
  },
  development: {
    CUSTOM_NODE_ENV: 'development',
    APP_BASE_URL: '//baidu.com/development',
  },
  pre: {
    CUSTOM_NODE_ENV: 'pre',
    APP_BASE_URL: '//baidu.com/pre',
  },
  production: {
    CUSTOM_NODE_ENV: 'production',
    APP_BASE_URL: '//baidu.com/production',
  }
};

const config = {
  devHost: '0.0.0.0',
  devPort: 9991,
  isAnalyze: true,
  analyzerPort: 9992,
  envVar: envVar,
  outputPath: outputPath,
  // host: './',

  entry: 'src/index.js',
  distributePort: 9993,
  type: '',
  test: {
    // testMatch: ['app/**/__tests__/**/*.js?(x)', 'app/**/?(*.)(spec|test).js?(x)'],
    // transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    // collectCoverageFrom: ['app/**/*.{js,jsx}']
    // moduleNameMapper: webpackConfigAlias,
  }
}

module.exports = config
