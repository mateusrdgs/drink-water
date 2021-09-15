const path = require('path')

const config = {
  file: './main/index.html',
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  },
  width: 400,
  height: 300,
}

module.exports = {
  config
}