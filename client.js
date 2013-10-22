var net = require('net');
var game = require('./game.js');

var status = 0;

client = net.connect({
	port: 5993,
	host: 'localhost'
});

client.on('data', function(data) {
	console.log(data.toString());
	if(status === 0) {
		if(data.toString() === "OK") {
			client.write("ME username");
		} else {
			console.log("Err");
		}
	}
});