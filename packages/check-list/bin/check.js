#!/usr/bin/env node
const chalk = require('chalk')
require('../lib/help')()

//===== Padding. =====
process.on('exit', function () {
  console.log()
})

const config = require('../config')
const checkRule = require('../lib/checkRule')
const ask = require('../lib/ask')

async function check({
  rules,
  questions,
} = {}) {
  const failedRules = rules.filter((rule, index) => !checkRule({ ...rule, index }))

  if (failedRules.length) {
    console.log(chalk.red(`\n  ✖ total ${failedRules.length} rules failed!`))
    process.exit(1)
  }
  const shouldAsk = (process.env.DEBUG !== 'true') && questions && questions.length
  const ok = shouldAsk ? await ask(questions) : true

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
