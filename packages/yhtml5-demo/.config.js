const path = require('path')
const entry1 = path.resolve(__dirname, './images/*.{jpg,png}')

const config = {
  upload: {
    entries: [entry1],
  }
}

module.exports = config
