const { app, BrowserWindow, ipcMain } = require('electron')
const Store = require('electron-store')

const Window = require('./window')
const { config: mainWindowConfig } = require('./main')
const { config: weightWindowConfig } = require('./weight')
const tray = require('./core/components/tray')
const constants = require('./core/constants')

const store = new Store()

let _tray
let _mainWindow
let _weightWindow

const onAppReady = () => {
  _tray = tray.create()
  let weight;

  _mainWindow = new Window({
    file: mainWindowConfig.file,
    webPreferences: mainWindowConfig.webPreferences
  })

  // app.on('activate', function () {
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })

  if (!weight) {
    _weightWindow = initWindow({ ...weightWindowConfig, parent: _mainWindow, modal: true })
  }

  ipcMain.on(constants.CHANNEL.INPUT_WEIGHT, (_, value) => {
    store.set('weight', value)
    _weightWindow.close()
  })

  _mainWindow.init()
}

const initWindow = options => {
  const newWindow = new Window({ ...options })
  newWindow.init()

  return newWindow
}

app.whenReady()
  .then(onAppReady)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})