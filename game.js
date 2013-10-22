var protMod = require('./protocol.js'),
	protReader = protMod.getReader();


/**
 * Player class
 */
function Player(socket) {
	var player = this,
		readyCb = function() {};

	this.socket = socket;
	this.score = 0;
	this.game;
	this.position;
	this.username;

	// min: 0 | max: game.width-this.racketWith
	this.racketPos = 0;
	this.racketWith = 1;

	this.ready = function(cb) {
		readyCb = cb;
	};

	this.send = function(cmdStr) {
		socket.write(cmdStr);
	};

	socket.on('end', function() {
		if(this.game) {
			this.game.unsetPlayer(position);
		}
	});

	socket.on('data', function(buffer) {
		if(!this.username) {
			var username = protReader.readUsername(buffer);
			if(username) {
				player.username = username;
				socket.write("OK");
				readyCb(player);
			} else {
				socket.destroy();
			}
		}
	});

	// welcome client
	socket.write('OK');
}

/**
 * Game class
 */
function Game(width, height) {
	/* Game states */
	this.running = false;
	this.id = 0;
	this.width = width;
	this.height = height;

	var bx = 5,
		by = 5,
		bvx = 0,
		bvy = 1;

	/* Players */
	var upPlayer,
		downPlayer;

	this.setPlayer = function(position, player) {
		if(position === 1) {
			upPlayer = player;
		} else if(position === 0) {
			downPlayer = player;
		}
	};

	this.unsetPlayer = function(position) {
		if(position === 1) {
			upPlayer = false;
		} else if(position === 0) {
			downPlayer = false;
		}
	}

	this.getFreePosition = function() {
		if(!upPlayer) return 1;
		if(!downPlayer) return 0;
		return -1;
	};

	this.start = function() {
		this.running = true;
	};

	this.updateBall = function() {
		bx += bvx;
		by += bvy;
	};

	this.sendPositions = function() {
		upPlayer.send("RA " + downPlayer.racketPos);
		upPlayer.send("BA " + bx + "\n" + by);
		downPlayer.send("RA " + upPlayer.racketPos);
		downPlayer.send("BA " + bx + "\n" + by);
	};
}

exports.createPlayer = function(s) {
	return new Player(s);
};

exports.createGame = function(w, h) {
	return new Game(w, h);
};