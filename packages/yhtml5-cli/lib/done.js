const chalk = require('chalk')

function done (projectPatch) {
  console.log(chalk.green('\nThe next you can do: '))
  console.log('    cd ' + projectPatch)
  console.log('    npm i')
  console.log('    npm run dev')
  console.log('    npm run build')
  console.log(chalk.yellow('\nYHTML5: '), chalk.red('logo'), chalk.green('logo'), chalk.blue('logo'), chalk.magenta('logo'), chalk.cyan('logo'), chalk.white('logo\n'))
}

module.exports = done
