'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 450});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});






// var CONFIG = {};
// CONFIG.host = 'localhost';
// CONFIG.port = 3000;
//
// // socket.io
// var io = require('socket.io-client');
// client = io.connect('http://'+CONFIG.host+':'+CONFIG.port);
//
// // Booting app
// console.log('\033c'); // clear terminal
// console.log('Starting Production Timer');
//
// // on connection
// client.on('connect',function() {
//   console.log('Successfully connected to http://'+CONFIG.host+':'+CONFIG.port);
// });
//
// // on disconnect
// client.on('disconnect', function(){
//     console.log('Lost connection to http://'+CONFIG.host+':'+CONFIG.port);
// });
//
// // recieve content from server
// client.on('content',function(data) {
//   console.log('Recieved data from Server:');
//   console.log(data);
// });
