const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const compress = ({
  entries = [],
  output = ''
}) => imagemin(entries, output, {
  plugins: [
    imageminJpegtran(),
    imageminPngquant({ quality: '65-80' })
  ]
})
  .then(files => {
    const filesPath = files.map((v, i) => {
      return v.path
    })
    return filesPath
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
  })
  .catch((e) => console.error(e))

module.exports = compress
