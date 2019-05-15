const fs = require('fs')
const path = require('path')

function getFilesPath(dir) {
  let files = []
  const fsStat = fs.lstatSync(dir)
  // 可能或遇到link造成循环
  if (fsStat.isDirectory()) {
    const _dirs = fs.readdirSync(dir)
    _dirs.forEach(_dir => {
      files = [...files, ...getFilesPath(path.resolve(dir, _dir))]
    })
    return files
  } else if (fsStat.isFile()) {
    files.push(dir)
    return files
  } else {
    return files
  }
}

module.exports = getFilesPath
