var arDrone = require('ar-drone');
//var http    = require('http');

var client = arDrone.createClient();
var flying = false;
var Actions = function() {};

Actions.prototype.takeoff = function()  {
	client.takeoff();
	flying = true;
	console.log('flying');
}

Actions.prototype.land = function()  {
	client.land();
	flying = false;
	console.log('landed');
}

Actions.prototype.toggleFlying = function()  {
	if (flying) land();
	else this.takeoff();
}

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
}

module.exports = Actions;