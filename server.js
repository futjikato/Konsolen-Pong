var net = require('net');
var game = require('./game.js');

var runningGames = [],
	quedGame = game.createGame(50, 50);

function handshake(c, authDone) {
	// player class does handshake
	var player = game.createPlayer(c);
	player.ready(function() {
		authDone(player);
	});
}

net.createServer(function(c) {

	handshake(c, function(player) {
		var position = quedGame.getFreePosition();
		player.position = position;
		player.game = quedGame;
		quedGame.setPlayer(position, player);
		console.log('adding player');
		console.log(quedGame.getFreePosition());

		if(quedGame.getFreePosition() === -1) {
			var id = runningGames.push(quedGame) - 1;
			quedGame.id = id;
			console.log("Stating new game ( ID " + id + " )");
			quedGame.start();
			quedGame = game.createGame(50, 50);
		}
	});	
}).listen(5993, function() {
  console.log('Gameserver listening on port 5993.');
});

setInterval(function() {
	runningGames.forEach(function(game) {
		game.updateBall();
		game.sendPositions();
	});
}, 100);