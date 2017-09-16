'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
// process.env.PUBLIC_URL = '';

const jest = require('jest');
const path = require('path');
const paths = require('../utils/paths');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
// require('../config/env');

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
// if (!process.env.CI && argv.indexOf('--coverage') < 0) {
// argv.push('--watch');
// }

// This is not necessary after eject because we embed config into package.json.
const createJestConfig = require('../utils/createJestConfig');

const jestConfig = createJestConfig(
  relativePath => path.resolve(__dirname, '..', relativePath),
  path.resolve(paths.appSrc, '..'),
  false
)

paths.isBeforePublish && console.log('\ntest.js\n', {
  'process.argv': process.argv,
  paths,
  argv,
  jestConfig,
})

argv.push(
  '--config',
  JSON.stringify(
    jestConfig
  )
);

jest.run(argv);








