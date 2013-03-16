var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var actions = require('actions');
client.createRepl();