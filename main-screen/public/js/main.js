// load or initialize local Storage
if(!localStorage.getItem('config.host')) localStorage.setItem('config.host','localhost');
if(!localStorage.getItem('config.port')) localStorage.setItem('config.port','3000');


// socket.io
var io = nodeRequire('socket.io-client');
var client;
startWebsocket();

// connection functions
$(document).ready(function() {
  showConnectingView();

  // change ip-adress
  $(".changeIpAddressAndPort").on('click',function( event ) {
    event.preventDefault();

    // disconnect
    client.disconnect();

    $('.application-sync .connect').hide();
    $('.application-sync .edit-ipaddress').show ();

    // get new adress
    $('#newHost').val(localStorage.getItem('config.host'));
    $('#newPort').val(localStorage.getItem('config.port'));
  });

  // save changes at host and port
  $(".saveIpAddressAndPort").on('click',function( event ) {
    event.preventDefault();

    // save to local storage
    localStorage.setItem('config.host',$('#newHost').val());
    localStorage.setItem('config.port',$('#newPort').val());

    // reload view
    showConnectingView();

    // reconnect
    // client = io.connect('http://'+localStorage.getItem('config.host')+':'+localStorage.getItem('config.port'),{
    //   query: "authentication=sDJZn16TuP7zu82a"
    // });
    startWebsocket();
  });
});

function showConnectingView() {
  $('.application-online').hide();
  $('.application-sync .ipadress').html(localStorage.getItem('config.host')+':'+localStorage.getItem('config.port'));
  $('.application-sync .connect').show();
  $('.application-sync .edit-ipaddress').hide();
  $('.application-sync').show();
}

function hideConnectingView() {
  $('.application-sync').hide();
  $('.application-online').show();
}


function startWebsocket() {
  client = io.connect('http://'+localStorage.getItem('config.host')+':'+localStorage.getItem('config.port'),{
    query: "authentication=sDJZn16TuP7zu82a"
  });

  // on connection
  client.on('connect',function() {
    console.log('Successfully connected to http://'+localStorage.getItem('config.host')+':'+localStorage.getItem('config.port'));
    hideConnectingView();
  });

  // on disconnect
  client.on('disconnect', function(){
      console.log('Lost connection to http://'+localStorage.getItem('config.host')+':'+localStorage.getItem('config.port'));
      showConnectingView();
  });

  // recieve content from server
  client.on('content',function(data) {
    console.log('Recieved data from Server:');
    if(data.type == 'mainContent') {
      $('.mainContent').html(data.content);
    }
  });
}
