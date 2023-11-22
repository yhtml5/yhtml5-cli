var chalk = require('chalk')

/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */

module.exports = function evalualte (exp, data) {
  /* eslint-disable no-new-func */
  var fn = new Function('data', 'with (data) { return ' + exp + '}')
  try {
    return fn(data)
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter condition: ' + exp))
  }
}
