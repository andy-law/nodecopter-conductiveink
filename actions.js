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

module.exports = Actions;