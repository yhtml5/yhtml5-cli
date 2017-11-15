/**
 * Author: yhtml5
 * Description: The configuration file for the yhtml5-scripts should not be packaged into the app
 *
 */
const config = {
  devHost: '0.0.0.0',
  devPort: 9991,
  isAnalyze: true,
  analyzerPort: 9992,
  // host: './',

  entry: 'src/index.js',
  output: 'dist',
  outputVersion: '',
  distributePort: 9993,
  type: '',
  templateHtml: 'src/pages/template.js',
  test: {
    // testMatch: ['app/**/__tests__/**/*.js?(x)', 'app/**/?(*.)(spec|test).js?(x)'],
    // transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    // collectCoverageFrom: ['app/**/*.{js,jsx}']
    // moduleNameMapper: webpackConfigAlias,
  }
}

module.exports = config
