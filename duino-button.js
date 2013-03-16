// to run cd into repo then node filename.js

var arduino = require('duino'),
    board = new arduino.Board();

var button = new arduino.Button({
  board: board,
  pin: 4
});

button.on('down', function(){
  console.log('BOOM');
});
