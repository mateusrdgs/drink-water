const { contextBridge, ipcRenderer } = require('electron')

const constants = require('../core/constants')

contextBridge.exposeInMainWorld('onHoursSubmit', (e) => {
  ipcRenderer.send(constants.CHANNEL.INPUT_HOURS, e)
})
