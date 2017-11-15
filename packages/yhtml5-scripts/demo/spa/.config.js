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
  output: '/',
  type: '',
  templateHtml: 'src/pages/template.js',
  test: {
    // testMatch: ['demo/__test__/**/*.js?(x)'],
    // transformIgnorePatterns: ["node_modules/(?!(yhtml5-test|react-redux|react-native-button)/)"],
    // moduleNameMapper: webpackConfigAlias,
    // collectCoverageFrom: ['src/**/*.{js,jsx}'],
  }
}

module.exports = config

