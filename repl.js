var arDrone = require('ar-drone');
var client  = arDrone.createClient();

var currentAltitude = 0;
var currentAltitudeMeters = 0;

setInterval(function() {
  console.log("current altitude: " + currentAltitude.toString());
  console.log("current altitude meters: " + currentAltitude.toString());
}, 1000);

client
  .on('navdata', function(data) {
    if (data.demo) {
      // console.log(data.demo);
      currentAltitude = data.demo.altitudeMeters;
      currentAltitudeMeters = data.demo.altitudeMeters;
    }
  });

client.createRepl();

