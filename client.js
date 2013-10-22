var net = require('net');
var game = require('./game.js');

var status = 0;

client = net.connect({
	port: 5993,
	host: 'localhost'
});

client.on('data', function(buffer) {
	var str = buffer.toString();
	console.log(str);
	if(status === 0) {
		if(str === "OK") {
			status = 1;
			client.write("ME username");
		} else {
			console.log("Err");
		}
	} else if(status === 1) {
		if(str === "OK") {
			status = 2;
		} else {
			client.write("ME player" + parseInt(Math.random() * 1000, 10));
		}
	} else if(status === 2) {
		console.log(str);
	} else {
		console.log("Err - status ?");
	}
});