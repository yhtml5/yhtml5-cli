var fs = require('fs');
const path = require('path');
const paths = require('../config/paths');
const chalk = require('chalk');

const antdPath = path.resolve(paths.appPath, 'node_modules/antd')
const babelPluginImport = path.resolve(paths.appPath, 'node_modules/babel-plugin-import')
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
function checkRequiredFiles(files) {
  try {
    files.forEach(filePath => {
      fs.accessSync(filePath, fs.F_OK);
    });
    return true;
  } catch (err) {
    return false;
  }
}

const checkAntd = checkRequiredFiles([antdPath])
const checkBabelPluginImport = checkRequiredFiles([babelPluginImport])

function dealAntd({ position = null }) {
  // if use antd, push babel-plugin-import options
  if (checkRequiredFiles([antdPath])) {
    const babelPluginImport = [
      "import", {
        "libraryName": "antd",
        "style": "css" //`style: true` 会加载 less 文件
      }]
    position && position.push(babelPluginImport)
  }
  // if use antd , checkout if babel-plugin-import install
  if (checkAntd) {
    if (!checkBabelPluginImport) {
      console.log('')
      console.log(chalk.red('You are use antd, but we could not find a required node module.'));
      console.log(chalk.red('  Name: ') + chalk.cyan('babel-plugin-import'));
      console.log(chalk.red('  Please run npm i babel-plugin-import -D in your project\n'));
      process.exit(1)
    }
  }
}

paths.isPublish || console.log('\ncheckAntd\n', {
  antdPath,
  babelPluginImport,
  checkAntd,
  checkBabelPluginImport
})

module.exports = dealAntd
