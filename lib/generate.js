const path = require('path')
const shell = require('shelljs')

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} projectPatch
 * @param {String} cachePath
 * @param {Function} done
 */

function generate (projectPatch, cachePath, done) {
  shell.mkdir('-p', projectPatch)
  shell.cp('-Rf', cachePath+'apps/react', projectPatch)
  done()
}

module.exports = generate
