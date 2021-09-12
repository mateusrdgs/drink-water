const { BrowserWindow } = require('electron')

const defaultProps = {
  width: 800,
  height: 600,
  show: false
}

class Window extends BrowserWindow {
  constructor({ file, ...options }) {
    super({ ...defaultProps, ...options })

    this.loadFile(file)
    this.webContents.openDevTools()
  }

  init() {
    this.show()
  }
}

module.exports = Window