'use strict';

const fs = require('fs');
const chalk = require('chalk');
const paths = require('./paths');
const {
  testMatch,
  testPathIgnorePatterns,
  collectCoverageFrom,
  coveragePathIgnorePatterns,
  transformIgnorePatterns,
  moduleNameMapper
} = require('../.config.js');
const packageJson = require('../package.json');

const customTestMatch = 1

module.exports = (resolve, rootDir, isEjecting) => {
  // Use this instead of `paths.testsSetup` to avoid putting
  // an absolute filename into configuration after ejecting.
  const setupTestsFile = fs.existsSync(paths.testsSetup)
    ? `${rootDir}/src/setupTests.js`
    : undefined;

  // TODO: I don't know if it's safe or not to just use / as path separator
  // in Jest configs. We need help from somebody with Windows to determine this.
  const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx}'].concat(collectCoverageFrom),
    coveragePathIgnorePatterns: ['/node_modules/'].concat(coveragePathIgnorePatterns),
    setupFiles: [resolve('polyfills/index.js')],
    setupTestFrameworkScriptFile: setupTestsFile,
    testMatch: [
      `${rootDir}/src/**/__tests__/**/*.js?(x)`,
      `${rootDir}/src/**/?(*.)(spec|test).js?(x)`,
    ].concat(testMatch),
    testPathIgnorePatterns: ['/node_modules/'].concat(testPathIgnorePatterns),
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx)$': resolve('utils/babelTransform.js'),
      '^.+\\.css$': resolve('utils/cssTransform.js'),
      '^(?!.*\\.(js|jsx|css|json)$)': resolve('utils/fileTransform.js'),
    },
    transformIgnorePatterns: transformIgnorePatterns.length
      ? transformIgnorePatterns
      : ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleNameMapper: Object.assign({
      '^react-native$': 'react-native-web',
    }, moduleNameMapper),
    moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node'],
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  const overrides = Object.assign({}, require(paths.appPackageJson).jest);
  const supportedKeys = [
    'collectCoverageFrom',
    'coverageReporters',
    'coverageThreshold',
    'snapshotSerializers',
  ];
  if (overrides) {
    supportedKeys.forEach(key => {
      if (overrides.hasOwnProperty(key)) {
        config[key] = overrides[key];
        delete overrides[key];
      }
    });
    const unsupportedKeys = Object.keys(overrides);
    if (unsupportedKeys.length) {
      console.error(
        chalk.red(
          'Out of the box, ' +
          packageJson.name +
          ' only supports overriding ' +
          'these Jest options:\n\n' +
          supportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n') +
          '.\n\n' +
          'These options in your package.json Jest configuration ' +
          'are not currently supported by ' +
          packageJson.name +
          ':\n\n' +
          unsupportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n') +
          '\n\nIf you wish to override other Jest options, you need to ' +
          'eject from the default setup. You can do so by running ' +
          chalk.bold('npm run eject') +
          ' but remember that this is a one-way operation. ' +
          'You may also file an issue with Create React App to discuss ' +
          'supporting more options out of the box.\n'
        )
      );
      process.exit(1);
    }
  }

  paths.isBeforePublish && console.log('\ncreateJestConfig.js\n', {
    rootDir,
    testMatch,
    setupTestsFile,
    overrides,
    config,
  })
  return config;
};
