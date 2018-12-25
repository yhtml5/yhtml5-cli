#!/usr/bin/env node
const chalk = require('chalk')
require('../lib/help')()

//===== Padding. =====
process.on('exit', function () {
    console.log()
})

const config = require('../config')
const ask = require('../lib/ask')
const checkCode = require('../lib/checkCode')
const getDirSize = require('../lib/getDirSize')
const checkRequiredFiles = require('../lib/checkRequiredFiles')

async function check({
    rules,
    questions,
} = {}) {
    const successText = chalk.blue('success!')
    const failedRules = rules.filter((rule, index) => {
        const {
            type = '',
            describe = '',
            paths = [],
            regex = /^!@#$/,
            min = 0,
            max = Infinity,
        } = rule || {}
        const consoleSuccess = () => console.log(chalk.green(`  ${index}.${describe}:`), successText)
        const consoleFail = (num = 1) => console.log(chalk.green(`  ${index}.${describe}:`), chalk.red(`${num} failed!`))
        const handler = {
            title: () => {
                console.log(chalk.green('Check List Rules:'))
                return true
            },
            regex: () => {
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
            require: () => {
                const hasRequiredFiles = checkRequiredFiles(paths)
                hasRequiredFiles ? consoleSuccess() : consoleFail()
                return !!hasRequiredFiles
            },
            limit: () => {
                const size = paths.reduce((init, current) => init + getDirSize(current), 0)
                if (size > max * 1024) {
                    consoleFail()
                    console.log(chalk.green('    limit max:', `size > ${max}kb`))
                    return false
                } else if (size < min * 1024) {
                    consoleFail()
                    console.log(chalk.green('    limit min:', `size < ${min}kb`))
                    return false
                } else {
                    consoleSuccess()
                    return true
                }
            },
        }
        // console.log()
        return !handler[type]()
    })

    if (failedRules.length) {
        console.log(chalk.red(`\n  ✖ total ${failedRules.length} rules failed!`))
        process.exit(1)
    }

    const ok = (questions && questions.length)
        ? await ask(questions)
        : true
    if (ok) {
        console.log(chalk.blue('\n  √ The checklist was successful!'))
    } else {
        console.log(chalk.red('\n  ✖ There are several questions you answered no!'))
        process.exit(1)
        // questions.forEach((question) => {
        //     console.log(chalk.blue(`> ${question}`))
        // })
    }
}

check(config)
