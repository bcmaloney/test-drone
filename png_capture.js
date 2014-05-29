var arDrone = require('ar-drone');
var client = arDrone.createClient();
var datadir = 'data';
var fs = require('fs');

client.takeoff();

client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .on('navdata', function(data) {
    // console.log(JSON.stringify(data));
    // console.log("\n\n\n\n\n\n");
  });
var pngStream = client.getPngStream()
  .on('data', function(buffer) {
    console.log("foo");
    fs.writeFile('data/' + Date.now().toString() + '.png', buffer);
  });
