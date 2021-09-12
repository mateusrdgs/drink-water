const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')

const Window = require('./window')

const tray = require('./core/components/tray')
const constants = require('./core/constants')

let _tray

const onAppReady = () => {
  _tray = tray.create()

  let _mainWindow = new Window({
    file: './weight/index.html',
    webPreferences: {
      preload: path.join(__dirname, 'weight', 'preload.js')
    }
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on(constants.CHANNEL.INPUT_WEIGHT, (_, payload) => {
    console.log(payload)
  })

  _mainWindow.init()
}

app.whenReady()
  .then(onAppReady)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})