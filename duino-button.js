// to run cd into repo then node filename.js

var arduino = require('duino'),
    board = new arduino.Board();

var data = [
    {
        pins: [4],
        startCommand: "toggleFlying",
        endCommand: null
    },
    {
        pins: [5],
        startCommand: "flyUp",
        endCommand: "stop"
    },
    {
        pins: [6],
        startCommand: "flyDown",
        endCommand: "stop"
    }
];

var buttons = [];

var btnMapper = new ButtonMapper();
for( var i=0; i<data.length; i++ ) {
    btnMapper.addCommand(data[i]);
}

var button = new arduino.Button({
    board: board,
    pin: 4
});

button.prototype.input = new ButtonInput(4);

buttons.push(button);


var Actions = require('./actions');
var controller = new Actions();

for( i=0; i<buttons.length; i++ ) {
    var button = buttons[i];

    button.on('down', function(){
        this.input.onPressed();
        var commands = btnMapper.buttonPressed(this.input.id);
        for( var i=0; i<commands.length; i++ ) {
            console.log(commands[i]);
            controller[commands[i]]();
        }
        //toggleFlying();
    });

    button.on('up', function() {
        this.input.onRelease();
        var commands = btnMapper.buttonRelease(this.input.id);
        for( var i=0; i<commands.length; i++ ) {
            console.log(commands[i]);
            controller[commands[i]]();
        }
    });
}

