const { contextBridge, ipcRenderer } = require('electron')

const constants = require('../core/constants')

contextBridge.exposeInMainWorld('onWeightSubmit', (e) => {
  ipcRenderer.send(constants.CHANNEL.INPUT_WEIGHT, e)
})
