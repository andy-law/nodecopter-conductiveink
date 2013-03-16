//var arduino = require('duino'),
//    board = new arduino.Board();

/*var button = new arduino.Button({
  board: board,
  pin: 4
});

var btn = new arduino.Button({
  board: board,
  pin: 10
});

var btn2 = new arduino.Button({
  board: board,
  pin: 11
});

button.on('down', function(){
  flying= !flying;
  controller.toggleFlying();
  console.log('takeoff');
});

btn.on('down', function(){
  controller.rotateLeft();
  console.log('rotate');
});

btn.on('up', function(){
  controller.stopRotation();
  console.log('stop rot');
});

btn2.on('down', function(){
  controller.rotateRight();
  console.log('rotate');
});

btn2.on('up', function(){
  controller.stopRotation();
  console.log('stop rot');
}); */


var arDrone = require('ar-drone');
var http    = require('http');

var client = arDrone.createClient();

var flying = false;
var Actions = function() {};
var controller = new Actions();

Actions.prototype.toggleFlying = function()  {
	console.log("toggle flying");
    if (flying) {
        client.land();
        flying = false;
    } else {
        console.log("TAKE OFF!!!");
        client.takeoff();
        flying = true;
    }
}

Actions.prototype.getClient = function() {
    return client;
}

Actions.prototype.rotateLeft = function(speed) {
    speed = speed || 0.5;
    client.clockwise(speed);
}

Actions.prototype.rotateRight = function(speed) {
    speed = speed || 0.5
    client.counterClockwise(speed);
}

Actions.prototype.up = function() {
    client.up(0.5).after(500, function() { this.stop(); });
}

Actions.prototype.down = function() {
    client.down(0.5).after(500, function() { this.stop(); });
}

Actions.prototype.right = function() {
    client.right(0.5).after(500, function() { this.stop(); });
}

Actions.prototype.left = function() {
    client.left(0.5).after(500, function() { this.stop(); });
}

Actions.prototype.stop = function() {
    client.stop();
}

/* These can use native
Actions.prototype.up = function(speed)  {
	client.up(speed || 0.5);
}

Actions.prototype.down = function(speed)  {
	client.down(speed || 0.5);
}

Actions.prototype.left = function(speed)  {
	client.left(speed || 0.5);
}

Actions.prototype.right = function(speed)  {
	client.right(speed || 0.5);
}

Actions.prototype.front = function(speed)  {
	client.front(speed || 0.5);
}

Actions.prototype.back = function(speed)  {
	client.back(speed || 0.5);
} */

module.exports = Actions;