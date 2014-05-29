var arDrone = require('ar-drone');
var client  = arDrone.createClient();

var currentAltitude = 0;
var speed = 0.75;

client.takeoff();

client
  .on('navdata', function(data) {
    if (data.demo) {
      currentAltitude = data.demo.altitudeMeters;
    }
    if (currentAltitude < 1.0) {
      client.up(speed);
    }
    if (currentAltitude > 3.0) {
      client.down(speed);
    }
  });

client.createRepl();

