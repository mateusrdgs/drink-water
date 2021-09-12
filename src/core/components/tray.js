const { app, Menu, nativeImage, Tray } = require('electron')

const create = () => {
  const icon = nativeImage.createFromPath('./assets/images/drop.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', type: 'normal', click: () => app.showAboutPanel() }
  ])
  
  tray.setContextMenu(contextMenu)
  tray.setToolTip('This is my application')

  return tray
}

module.exports = {
  create
}