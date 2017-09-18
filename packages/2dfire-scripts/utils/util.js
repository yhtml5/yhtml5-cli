const fs = require('fs');
const path = require('path');
const ownPackageJson = require('../package.json');

const appDirectory = fs.realpathSync(process.cwd())
const scriptsPath = path.resolve(appDirectory, `node_modules/${ownPackageJson.name}`);

const reactScriptsLinked =
  fs.existsSync(scriptsPath) &&
  fs.lstatSync(scriptsPath).isSymbolicLink();

const isBeforePublish = !reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', '2dfire-scripts', 'utils')) !== -1

module.exports = {
  appDirectory,
  isBeforePublish
}