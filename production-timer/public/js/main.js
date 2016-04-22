// // In page 1.
// require('remote').getGlobal('sharedObject').someProperty = 'new value';
//
// // In page 2.
// console.log(require('remote').getGlobal('sharedObject').someProperty);

$(document).ready(function () {
  $("#newTime").submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
  });

  $(".start").on('click',function( event ) {
    alert( "Handler for .start called." );
    event.preventDefault();
  });

  $(".pause").on('click',function( event ) {
    alert( "Handler for .pause called." );
    event.preventDefault();
  });

  $(".stop").on('click',function( event ) {
    alert( "Handler for .stop called." );
    event.preventDefault();
  });

  $(".reset").on('click',function( event ) {
    alert( "Handler for .reset called." );
    event.preventDefault();
  });
});
