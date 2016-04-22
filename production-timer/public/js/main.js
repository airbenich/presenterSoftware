var CONFIG = {};
CONFIG.host = 'localhost';
CONFIG.port = 3000;
var timeZoneOffset = new Date(0).getTimezoneOffset()*60*1000;
console.log(timeZoneOffset);
var timer = {
  'initialTime': new Date(0+timeZoneOffset),
  'currentTime': new Date(0+timeZoneOffset),
  'runningTime': new Date(0+timeZoneOffset)
}
var timerRunning = false;

// // In page 1.
// require('remote').getGlobal('sharedObject').someProperty = 'new value';
//
// // In page 2.
// console.log(require('remote').getGlobal('sharedObject').someProperty);

// socket.io
var io = nodeRequire('socket.io-client');
client = io.connect('http://'+CONFIG.host+':'+CONFIG.port);

// Booting app
console.log('\033c'); // clear terminal
console.log('Starting Production Timer');

// on connection
client.on('connect',function() {
  console.log('Successfully connected to http://'+CONFIG.host+':'+CONFIG.port);
  sendClockworkToServer();

  function sendClockworkToServer() {
    client.emit('content',{
      'type':'productionTimer',
      'content': timer
    });
    setTimeout(function () {
      sendClockworkToServer();
    },500);
  }
});

// on disconnect
client.on('disconnect', function(){
    console.log('Lost connection to http://'+CONFIG.host+':'+CONFIG.port);
});

// recieve content from server
client.on('content',function(data) {
  console.log('Recieved data from Server:');
  console.log(data);
});

$(document).ready(function () {
  clockwork();
  updateTimerInterface(true);

  $("#newTime").submit(function( event ) {
    event.preventDefault();
    timerRunning = false;
    var newTimeHours = $('#newTimeHours').val();
    var newTimeMinutes = $('#newTimeMinutes').val();
    var newTimeSeconds = $('#newTimeSeconds').val();
    // alert(newTimeHours + ':' + newTimeMinutes + ':' + newTimeSeconds);
    timer.initialTime.setHours(newTimeHours);
    timer.initialTime.setMinutes(newTimeMinutes);
    timer.initialTime.setSeconds(newTimeSeconds);
    timer.currentTime = timer.initialTime;
    updateTimerInterface();
  });

  $(".start").on('click',function( event ) {
    event.preventDefault();
    timerRunning = true;
  });

  $(".pause").on('click',function( event ) {
    event.preventDefault();
    timerRunning = false;
  });

  $(".stop").on('click',function( event ) {
    timerRunning = false;
    event.preventDefault();
    timer.currentTime = timer.initialTime;
    timer.runningTime = new Date(0+timeZoneOffset);
    updateTimerInterface();
  });

  $(".reset").on('click',function( event ) {
    event.preventDefault();
    timerRunning = false;
    timer.initialTime = new Date(0+timeZoneOffset);
    timer.currentTime = new Date(0+timeZoneOffset);
    timer.runningTime = new Date(0+timeZoneOffset);
  });

  function clockwork() {
    // check if timer is running and if time bigger than zero
    if(timerRunning && timer.currentTime.valueOf() > timeZoneOffset) {
      timer.currentTime = new Date(timer.currentTime.valueOf() - 1000);
    }
    timer.runningTime = new Date(timer.initialTime - timer.currentTime + timeZoneOffset);

    // repeat
    setTimeout(function () {
        clockwork();
    }, 1000);
  }

  function updateTimerInterface(repeat) {
    // update GUI
    $('#timeLeft').html(timer.currentTime.toLocaleTimeString().split(' ')[0]);
    $('#timeRunning').html(timer.runningTime.toLocaleTimeString().split(' ')[0]);

    // repeat function
    if(repeat) {
      setTimeout(function () {
          updateTimerInterface(true);
      }, 500);
    }
  }
});
