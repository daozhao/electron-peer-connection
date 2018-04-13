const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const p2pChannel = require('electron-peer-connection').main;
  
  let sendWin
  let recvWin
  
  function createWindow (htmlname) {
    win = new BrowserWindow({width: 800, height: 600})
  
    win.loadURL(url.format({
      pathname: path.join(__dirname, htmlname),
      protocol: 'file:',
      slashes: true
    }))
    win.webContents.openDevTools()
    win.on('closed', () => {
      win = null
    })
    return win;
  }
  
  app.on('ready',function() {
      sendWin = createWindow('send.html');
      recvWin = createWindow('recv.html');
      p2pChannel.initChannel();
      p2pChannel.addClient({ window: sendWin, name: 'sendWin' });
      p2pChannel.addClient({ window: recvWin, name: 'recvWin' });

  } )
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
  