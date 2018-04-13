const { ipcRenderer } = require('electron');
const WindowPeerConnection = require("electron-peer-connection").WindowPeerConnection;

var remoteVideo = document.getElementById('remoteVideo');


let recvWin= new WindowPeerConnection('recvWin');
recvWin.onReceivedStream(function (stream) {
  remoteVideo.srcObject = stream;
});