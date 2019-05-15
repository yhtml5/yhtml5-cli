'use strict'
const fs = require('fs')
const path = require('path')
const checkListVersion = require('../package.json').version

// get the current working directory
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// get check-list config
const configPath = resolveApp(process.argv[2])
const config = require(configPath)
const {
  debug,
  questions = [],
  rules = [],
} = config.checkList || {}

process.env.DEBUG = process.env.DEBUG || debug

if (debug) {
  console.log('Debug Info:')
  console.log('> checkListVersion:', checkListVersion)
  console.log('> appDirectory:', appDirectory)
  console.log('> configPath:', configPath)
  console.log('> process.argv:\n', process.argv)
  console.log('> rules:\n', rules)
  console.log('> questions:\n', questions)
  console.log('')
}

module.exports = {
  appDirectory,
  questions,
  rules,
}
