// to run cd into repo then node filename.js

var arduino = require('duino'),
    board = new arduino.Board();

var button = new arduino.Button({
  board: board,
  pin: 4
});


var Actions = require('./actions');
var controller = new Actions();

button.on('down', function(){
	controller.toggleFlying();
});
