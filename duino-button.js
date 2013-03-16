// to run cd into repo then node filename.js

var arduino = require('duino'),
    board = new arduino.Board();

var buttons = [
    {
        pin: 4,
        startCommand: "toggleFlying",
        startParams: null,
        endCommand: null,
        endParams: null
    },
    {
        pin: 10,
        startCommand: "rotateLeft",
        startParams: 0.5,
        endCommand: "stop",
        endParams: null
    },
    {
        pin: 11,
        startCommand: "rotateRight",
        startParams: 0.5,
        endCommand: "stop",
        endParams: null
    }
];



var Actions = require('./actions');
var controller = new Actions();

for( i=0; i<buttons.length; i++ ) {
    var button = new arduino.Button({
        board: board,
        pin: buttons[i].pin
    });
    console.log("adding button " + i);
    button.on('down', function(){
        var params = getButtonParams(this.pin);
        if( params == null ) {
            console.log("unable to find pin");
            return;
        }
        console.log(this.pin);
        console.log(params);
        var endArgs = params.startParams == null ? undefined : params.startParams
        var func = controller[params.startCommand];
        controller[params.startCommand]( endArgs );
    });

    button.on('up', function() {
        var params = getButtonParams(this.pin);
        if( params == null ) {
            console.log("unable to find pin");
            return;
        }
        if(params.endCommand == null ) return;
        var endArgs = params.endParams == null ? undefined : params.endParams;
        console.log("end command: " + params.endCommand);
        controller[params.endCommand]( endArgs );
    });
}

function getButtonParams(pin) {
    for( var i=0; i<buttons.length; i++ ) {
        console.log("Button: " + buttons[i].pin);
        console.log("pin: " + pin);
        if( buttons[i].pin == pin ) return buttons[i];
    }
    return null;
}



var http = require('http'),
    server = http.createServer(handler),
    fs = require('fs'),
    request = require("request"),
    path = require('path');

server.listen(8080);

var io = require('socket.io').listen(server),
    _socket;

function handler (req, res) {
    var url = req.url == "" || req.url == "/" ? "/index.html" : req.url;
    fs.readFile(__dirname + url,
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            var filePath = req.url;
            var extname = path.extname(filePath);
            var contentType = 'text/html';

            switch (extname) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.html':
                    contentType = "text/html";
                    break;
                case '.jpg':
                case '.jpeg':
                case '.png':
                    contentType = "image/jpeg";
                    break;
            }

            res.writeHead(200, {'Content-Type': contentType});
            res.end(data, 'utf-8');
        });
}

_socket = io.sockets.on('connection', function (socket) {
    console.log("socket connected");
    socketConnected = true;

    var client = controller.getClient();

    client.on('navdata', function(data){
        socket.emit('drone_data', data);
    });

    socket.on('droneCommand', function(data) {
        console.log(data);
        controller[data.functionName]();
    });
});