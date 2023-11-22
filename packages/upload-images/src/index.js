const fs = require('fs')
const ora = require('ora')
const path = require('path')
const shell = require('shelljs')
const home = require('user-home')
const compress = require('./compress')
const uploadHttp = require('./upload')
const spinner = ora('start upload...')
const cachePath = path.resolve(home, 'yhtml5-upload-images')
// const output = path.resolve(entries[0], '../../imaged')

async function run(config = {}) {
  const { entries = [] } = config.upload || {}
  spinner.start()
  // console.log('cachePath: ', cachePath)
  shell.rm('-rf', cachePath)
  const compressFilesPaths = await compress({ entries, output: cachePath })
  // console.log('entries', entries)
  // console.log('compressFilesPaths', compressFilesPaths)
  const uploadedResult = await uploadHttp(compressFilesPaths)
  // console.log('result', uploadedResult)
  // [{
  //  file: '/Users/yhtml5/projects/gits/yhtml5-cli/packages/yhtml5-upload-images/imaged/1.png',
  //  response: '{"code":1,"data":["frontend/5aab7991d0a7c576737eb326312bf72f.jpg"],"message":""}'}]
  const result = uploadedResult.map((v, i) => {
    return {
      name: path.basename(v.file),
      url: env('UPLOAD_DOMAIN') + v.response.data[0]
    }
  })

  shell.rm('-rf', cachePath)
  spinner.stop()
  console.log('result:\n', result)
  console.log('\nupload done!\n')
  return result
}

module.exports = run
