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
var io = nodeRequire('socket.io-client');
client = io.connect('http://'+CONFIG.host+':'+CONFIG.port,{
  query: "authentication=sDJZn16TuP7zu82a"
});


// on connection
client.on('connect',function() {
  console.log('Successfully connected to http://'+CONFIG.host+':'+CONFIG.port);
});

// on disconnect
client.on('disconnect', function(){
    console.log('Lost connection to http://'+CONFIG.host+':'+CONFIG.port);
});

// recieve content from server
client.on('content',function(data) {
  console.log('Recieved data from Server:');
  if(data.type == 'mainContent') {
    $('.mainContent').html(data.content);
  }
  if(data.type == 'productionTimer') {
    // console.log(new Date(data.content.initialTime));
    $('#timeLeft').html(new Date(data.content.currentTime).toLocaleTimeString().split(' ')[0]);
    $('#timeRunning').html(new Date(data.content.runningTime).toLocaleTimeString().split(' ')[0]);
  }
});
