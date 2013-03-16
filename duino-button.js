// to run cd into repo then node filename.js

var arduino = require('duino'),
    board = new arduino.Board();

var button = new arduino.Button({
  board: board,
  pin: 4
});

var arDrone = require('ar-drone');
var client = arDrone.createClient();
//var http    = require('http');

var flying = false;

function takeoff()  {
	client.takeoff();
	flying = true;
	console.log('flying');
}

function land()  {
	client.land();
	flying = false;
	console.log('landed');
}

function toggleFlying()  {
	if (flying) land();
	else takeoff();
}


button.on('down', function(){
	toggleFlying();
});
