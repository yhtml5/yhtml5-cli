const chalk = require('chalk')
const checkCode = require('./checkCode')
const getDirSize = require('./getDirSize')
const checkRequiredFiles = require('./checkRequiredFiles')
const getFilesPath = require('./getFilesPath')
const checkVueScoped = require('./checkVueScoped')

/**
 * check rule
 * @param { Object } rule
 */
function checkRule(rule) {
  const {
    type = '',
    describe = '',
    paths = [],
    regex = /^!@#$/,
    min = 0,
    max = Infinity,
    index = 0,
  } = rule || {}
  const consoleSuccess = ({ sizeText = '' } = {}) =>
    console.log(chalk.green(`  ${index}.${describe}:`), chalk.blue(`success! ${sizeText}`))
  const consoleFail = (num = 1) =>
    console.log(chalk.red(`  ${index}.${describe}:`), chalk.red(`${num} failed!`))

  const handler = {
    title() {
      console.log(chalk.green('Check List Rules:'))
      return true
    },
    vueScoped() {
      // 扁平化数组
      const checkFiles = paths.reduce((init, current) => ([...init, ...getFilesPath(current)]), [])
      const vueFiles = checkFiles.filter((path) => /\.vue/.test(path))
      const failedPaths = vueFiles.filter((path) => checkVueScoped(path))
      if (failedPaths.length) {
        consoleFail(failedPaths.length)
        console.log(chalk.red('    failedPaths:\n'), failedPaths)
      } else {
        consoleSuccess()
      }
      if (process.env.DEBUG === 'true') {
        console.log({
          paths,
          checkFiles,
          vueFiles,
          failedPaths,
        })
      }
      return failedPaths.length === 0
    },
    regex() {
      const failedPaths = paths.reduce((init, current) =>
        ([...init, ...checkCode(regex, current)]), [])
      if (failedPaths.length) {
        consoleFail(failedPaths.length)
        console.log(chalk.green('    regex:', regex))
        console.log(chalk.green('    failedPaths:\n'), failedPaths)
      } else {
        consoleSuccess()
      }
      // const customCheckCodeOk = customCheckCodeResults.every(result => result.failPaths.length === 0)
      return failedPaths.length === 0
    },
    require() {
      const hasRequiredFiles = checkRequiredFiles(paths)
      hasRequiredFiles ? consoleSuccess() : consoleFail()
      return !!hasRequiredFiles
    },
    limit() {
      const size = paths.reduce((init, current) => init + getDirSize(current), 0)
      const sizeText = `${size / 1000}kb`
      if (size > max * 1024) {
        consoleFail()
        console.log(chalk.red('    getDirSize:', sizeText))
        console.log(chalk.red('    limit max:', `${max}kb`))
        return false
      } else if (size < min * 1024) {
        consoleFail()
        console.log(chalk.red('    getDirSize:', sizeText))
        console.log(chalk.red('    limit min:', `${min}kb`))
        return false
      } else {
        consoleSuccess({ sizeText })
        return true
      }
    },
  }

  if (!handler[type]) {
    console.log(chalk.red('unknown rule.type!', rule))
  }

  return !!handler[type]()
}

module.exports = checkRule
