var arDrone = require('..');
var http    = require('http');

var actions = {
	var flying = false;

	function takeoff()  {
		arDrone.takeoff();
		flying = true;
	}

	function land()  {
		arDrone.land();
		flying = false;
	}

	function toggleFlying()  {
		if (flying) land();
		else takeoff();
	}
};

exports.actions = actions;