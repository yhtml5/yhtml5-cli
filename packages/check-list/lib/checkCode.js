const fs = require('fs')
const shell = require('shelljs')

function checkCode(regular, appDirectory) {
    const paths = shell.ls(`${appDirectory}/**/*.*`)
    return paths.filter(function (path, i) {
        const content = fs.readFileSync(path)
        const hasConflict = regular.test(content)
        if (hasConflict) {
            return path
        }
    })
}

module.exports = checkCode
