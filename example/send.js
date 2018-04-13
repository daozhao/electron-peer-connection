const { ipcRenderer } = require('electron');
const WindowPeerConnection = require("electron-peer-connection").WindowPeerConnection;

var startButton = document.getElementById('startButton');

startButton.onclick = startScreen;

var localVideo = document.getElementById('localVideo');

function senderStream(stream) {
let sendwin = new WindowPeerConnection('sendWin');
    sendwin.attachStream(stream);
    sendwin.sendStream('recvWin');
}

function startScreen() {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(gotStream)
        .catch(function (e) {
            alert('getUserMedia() error: ' + e.name);
        });
}

function gotStream(stream) {
    // trace('Received screen stream');
    localVideo.srcObject = stream;
    senderStream(stream);
    // localStream = stream;
    // callButton.disabled = false;
}