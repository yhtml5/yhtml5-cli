const path = require('path')
const entries = [
  path.resolve(__dirname, './images/*.{jpg,png}')
]

const config = {
  upload: {
    entries,
  }
}

module.exports = config
