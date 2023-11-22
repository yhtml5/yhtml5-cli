const path = require('path')
const shell = require('shelljs')

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} projectPatch
 * @param {String} source
 * @param {Function} done
 */

function generate (projectPatch, source, done) {
  shell.mkdir('-p', projectPatch)
  shell.cp('-Rf', source, projectPatch)
  done()
}

module.exports = generate
