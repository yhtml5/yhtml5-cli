'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
// const config = require('./config')


// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

// config after publish: we're in ./node_modules/yhtml5-scripts/config/
module.exports = {
  isPublish: true,

  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  // These properties only exist before ejecting:
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
};

const ownPackageJson = require('../package.json');
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
  fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();

const isPublish = reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', 'yhtml5-scripts', 'config')) === -1

isPublish || console.log('\npaths.js\n', {
  isPublish,
  appBuild: resolveOwn('demo/spa/dist'),
  servedPath: getServedPath(resolveOwn('package.json')),
  'process.env.PUBLIC_URL': process.env.PUBLIC_URL
})

// config before publish: we're in ./packages/yhtml5-scripts/config/
if (!isPublish) {
  module.exports = {
    isPublish,
    appPath: resolveApp('demo/spa'),                         // the root directory of app
    appBuild: resolveOwn('demo/spa/dist'),                   // dist directory
    appHtml: resolveOwn('demo/spa/public/index.html'),       // HtmlWebpackPlugin html template
    appIndexJs: resolveOwn('demo/spa/src/index.js'),         // the entry files of app
    appSrc: resolveOwn('demo/spa/src'),                      // src directory
    appPackageJson: resolveOwn('package.json'),              // package.json directory
    appPublic: resolveOwn('demo/spa/public'),                // public directory
    appNodeModules: resolveOwn('node_modules'),              // node_modules directory
    ownNodeModules: resolveOwn('node_modules'),
    ownPath: resolveOwn('.'),
    yarnLockFile: resolveOwn('demo/spa/yarn.lock'),           // yarn directory
    servedPath: getServedPath(resolveOwn('package.json')),    // host
    publicUrl: getPublicUrl(resolveOwn('package.json')),      // PUBLIC_URL

    dotenv: resolveOwn('template/.env'),
    // testsSetup: resolveOwn('template/src/setupTests.js'),
  };
}
