const { app, ipcMain } = require('electron')
const Store = require('electron-store')

const Window = require('./window')
const { config: mainWindowConfig } = require('./main')
const { config: weightWindowConfig } = require('./weight')
const { config: hoursWindowConfig } = require('./hours')
const tray = require('./core/components/tray')
const constants = require('./core/constants')

const store = new Store()

store.clear()

let _tray
let _mainWindow
let _weightWindow
let _hoursWindow

const onAppReady = () => {
  const weight = store.get('weight')
  const hours = store.get('hours')

  _tray = tray.create()

  _mainWindow = new Window({
    file: mainWindowConfig.file,
    webPreferences: mainWindowConfig.webPreferences
  })

  // app.on('activate', function () {
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })

  ipcMain.on(constants.CHANNEL.INPUT_HOURS, (_, value) => {
    store.set('hours', value)
    _hoursWindow.close()
  })

  ipcMain.on(constants.CHANNEL.INPUT_WEIGHT, (_, value) => {
    store.set('weight', value)
    _weightWindow.close()
  })

  if (!hours) {
    _hoursWindow = initWindow({ ...hoursWindowConfig, parent: _mainWindow, modal: true })
  }

  if (!weight) {
    _weightWindow = initWindow({ ...weightWindowConfig, parent: _mainWindow, modal: true })
  }

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