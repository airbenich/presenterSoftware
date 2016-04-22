var CONFIG = {};
CONFIG.host = 'localhost';
CONFIG.port = 3000;

// socket.io
var io = require('socket.io-client');
client = io.connect('http://'+CONFIG.host+':'+CONFIG.port);

// Booting app
console.log('\033c'); // clear terminal
console.log('Starting Test Send Client');

// on connection
client.on('connect',function() {
  console.log('Successfully connected to http://'+CONFIG.host+':'+CONFIG.port);
  console.log('Press enter to send Data to the Clients!');
  var stdin = process.openStdin();
  stdin.addListener("data", function(d) {
      // note:  d is an object, and when converted to a string it will
      // end with a linefeed.  so we (rather crudely) account for that
      // with toString() and then trim()
      //console.log("you entered: [" + d.toString().trim() + "]");
      var text;

      if(d.toString().trim() == '') {
        text = 'It works!<br>' + Math.floor((Math.random() * 10) + 1);
      } else {
        text = d.toString().trim();
      }
      // send test content
      client.emit('content',{
        'type':'mainContent',
        'content': text
      });
  });
});

// on disconnect
client.on('disconnect', function(){
    console.log('Lost connection to http://'+CONFIG.host+':'+CONFIG.port);
});

// recieve content from server
client.on('content',function(data) {
});
