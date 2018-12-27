'use strict'
const fs = require('fs')
const path = require('path')
const templateVersion = require('../package.json').version

// get the current working directory
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// get check-list config
const configPath = resolveApp(process.argv[2])
const config = require(configPath)

module.exports = {
  appDirectory,
  templateVersion,
  config,
}
