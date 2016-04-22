var CONFIG = {};
CONFIG.host = 'localhost';
CONFIG.port = 3000;

window.onload = function() {
  (function () {
      function checkTime(i) {
          return (i < 10) ? "0" + i : i;
      }

      function startTime() {
          var today = new Date(),
              h = checkTime(today.getHours()),
              m = checkTime(today.getMinutes()),
              s = checkTime(today.getSeconds());
          document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
          t = setTimeout(function () {
              startTime()
          }, 500);
      }
      startTime();
  })();
}


// // In page 1.
// require('remote').getGlobal('sharedObject').someProperty = 'new value';
//
// // In page 2.
// console.log(require('remote').getGlobal('sharedObject').someProperty);

// socket.io
var io = require('socket.io-client');
client = io.connect('http://'+CONFIG.host+':'+CONFIG.port);

// on connection
client.on('connect',function() {
  console.log('Successfully connected to http://'+CONFIG.host+':'+CONFIG.port);
});

// on disconnect
client.on('disconnect', function(){
    console.log('Lost connection to http://'+CONFIG.host+':'+CONFIG.port);
});

// recive content from server
client.on('content',function(data) {
  console.log(data);
});
