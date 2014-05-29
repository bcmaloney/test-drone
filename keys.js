var keypress = require('keypress');
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

var heading = null;
var speed = 0.05;
var step = 0.05;

function stop() {
  client.stop();
  speed = 0;
}

function shouldStop(direction) {
  if (heading != direction) {
    stop();
  }
}

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

client.takeoff();

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  if (key) {
    console.log('got "keypress"', key);
    if (key.ctrl && key.name == 'c') {
      process.stdin.pause();
      client.stop();
      client.land();
      process.exit();
    }
    switch (key.name) {
      case 'w':
        shouldStop('front');
        heading = 'front';
        speed += step;
        client.front(speed);
        break;
      case 'a':
        shouldStop('left');
        heading = 'left';
        speed += step;
        client.left(speed);
        break;
      case 's':
        shouldStop('back');
        heading = 'back';
        speed += step;
        client.back(speed);
        break;
      case 'd':
        shouldStop('right');
        heading = 'right';
        speed += step;
        client.right(speed);
        break;
    }
  }
});

setInterval(function() { console.log(speed);console.log(heading); }, 1000);
process.stdin.setRawMode(true);
process.stdin.resume();
