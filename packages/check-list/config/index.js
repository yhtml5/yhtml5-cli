'use strict'
const fs = require('fs')
const path = require('path')

// get the app runtime directory
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// get check-list config
const configPath = resolveApp(process.argv[2])
const config = require(configPath)
const {
    debug = false,
    questions = [],
    rules = [],
} = config.checkList || {}

if (debug) {
    console.log('Debug Info:')
    console.log('> appDirectory:', appDirectory)
    console.log('> configPath:', configPath)
    console.log('> rules:\n', rules)
    console.log('> questions:\n', questions)
    console.log('> process.argv:\n', process.argv)
    console.log('')
}

module.exports = {
    appDirectory,
    questions,
    rules,
}
