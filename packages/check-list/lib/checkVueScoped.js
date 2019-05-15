const fs = require('fs')

/**
 *
 * @param {*} dir
 * 校验不通过返回dir
 * 通过返回false
 */
function checkVueScoped(dir) {
  const fileContent = String(fs.readFileSync(dir))
  try {
    const styleTagRaw = fileContent.split(/<style /)[1].split(/>/)[0]
    const checkStatus = /scoped/.test(styleTagRaw)
    const styleTag = `<style ${styleTagRaw}>`
    if (process.env.DEBUG === 'true') {
      console.log({
        fileContent,
        styleTagRaw,
        styleTag,
        checkStatus
      })
    }
    return checkStatus ? false : dir
  } catch (error) {
    if (process.env.DEBUG === 'true') {
      console.log(error)
    }
  }
}

module.exports = checkVueScoped
