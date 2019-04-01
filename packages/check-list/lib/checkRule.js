const chalk = require('chalk')
const checkCode = require('./checkCode')
const getDirSize = require('./getDirSize')
const checkRequiredFiles = require('./checkRequiredFiles')

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
  const consoleSuccess = () => console.log(chalk.green(`  ${index}.${describe}:`), chalk.blue('success!'))
  const consoleFail = (num = 1) => console.log(chalk.red(`  ${index}.${describe}:`), chalk.red(`${num} failed!`))

  const handler = {
    title() {
      console.log(chalk.green('Check List Rules:'))
      return true
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
      return !failedPaths.length
    },
    require() {
      const hasRequiredFiles = checkRequiredFiles(paths)
      hasRequiredFiles ? consoleSuccess() : consoleFail()
      return !!hasRequiredFiles
    },
    limit() {
      const size = paths.reduce((init, current) => init + getDirSize(current), 0)
      if (size > max * 1024) {
        consoleFail()
        console.log(chalk.red('    getDirSize:', `${size / 1000}kb`))
        console.log(chalk.red('    limit max:', `${max}kb`))
        return false
      } else if (size < min * 1024) {
        consoleFail()
        console.log(chalk.red('    getDirSize:', `${size / 1000}kb`))
        console.log(chalk.red('    limit min:', `${min}kb`))
        return false
      } else {
        consoleSuccess()
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