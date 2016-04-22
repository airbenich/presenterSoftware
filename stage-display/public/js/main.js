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


// In page 1.
require('remote').getGlobal('sharedObject').someProperty = 'new value';

// In page 2.
console.log(require('remote').getGlobal('sharedObject').someProperty);
