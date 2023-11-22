/**
 * Author: yhtml5
 * Description: The configuration file for the yhtml5-scripts should not be packaged into the app
 * Notice: when this file changes, you should rerunning scripts
 */
const packageJson = require('./package.json')
const { getVersion } = require('yhtml5-dev-utils')
const outputPath = `dist/${getVersion(packageJson.version)}`

const envVar = {
  base:{
    APP_TITLE: 'SPA'
  },
  development: {
    customNodeEnv: 'development',
    fileBaseUrl: '../../file',
    shareApiBaeUrl: 'http://domain.com',
    gatewayApiBase: 'http://domain.com',
    gatewayApiEnv: '13cccf8b7b58467da82163d3cf540ef7'
  },
  production: {
    customNodeEnv: 'production',
    fileBaseUrl: '../../file',
    shareApiBaeUrl: 'http://domain.com',
    gatewayApiBase: 'http://domain.com',
    gatewayApiEnv: '13cccf8b7b58467da82163d3cf540ef7'
  },
  dev: {
    customNodeEnv: 'dev',
    fileBaseUrl: '../../file',
    shareApiBaeUrl: 'http://domain.com',
    gatewayApiBase: 'http://domain.com',
    gatewayApiEnv: '13cccf8b7b58467da82163d3cf540ef7'
  },
  daily: {
    customNodeEnv: 'daily',
    fileBaseUrl: '../../file',
    shareApiBaeUrl: 'http://domain.com',
    gatewayApiBase: 'http://domain.com',
    gatewayApiEnv: 'daily'
  },
  pre: {
    customNodeEnv: 'pre',
    fileBaseUrl: 'http://domain.com',
    shareApiBaeUrl: 'http://domain.com',
    gatewayApiBase: 'http://domain.com',
    gatewayApiEnv: 'pre'
  },
  publish: {
    customNodeEnv: 'publish',
    fileBaseUrl: 'http://domain.com',
    shareApiBaeUrl: 'http://domain.com',
    gatewayApiBase: 'http://domain.com',
    gatewayApiEnv: 'publish'
  },
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
  pages: [{
    title: '测试1',
    key: 'index',
    filename: 'index.html',
    path: 'src/pages/resume.js'
  }, {
    key: 'luyan',
    title: '测试2',
    filename: 'luyan.html',
    path: 'src/pages/luyan.js'
  }],
  type: '',
  test: {
    // testMatch: ['demo/__test__/**/*.js?(x)'],
    // transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    // moduleNameMapper: webpackConfigAlias,
    // collectCoverageFrom: ['src/**/*.{js,jsx}'],
  }
}

module.exports = config

