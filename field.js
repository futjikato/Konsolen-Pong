var xBorderChar = "-",
	yBorderChar = "|",
	blEdge		= "",
	brEdge		= "",
	ulEdge		= "",
	urEdge		= "";

exports.render = function(game, player1, player2) {
	var buffer = "";

	// upper border

	buffer += ulEdge;

	for(var j = 0 ; j <= ( game.width - 2 ) ; j++) {
		buffer += xBorderChar;
	}

	buffer += urEdge;

	// upper player

	for(var j = 0 ; j <= ( game.width ) ; ) {
		if(player1.racketPos == j) {
			j += player1.racketWith;

			for(var k = 0 ; j <= player1.racketWith ; k++) {
				buffer += 0xDC
			}
		} else {
			buffer += " ";
			j++;
		}
	}

	// free spacing in between

	for(var i = 0 ; i <= game.height ; i++) {
		buffer += yBorderChar;

		for(var j = 0 ; j <= game.width ; j++) {
			buffer += " ";
		}

		buffer += yBorderChar;
	}

	// lower player

	for(var j = 0 ; j <= ( game.width ) ; j++) {
		if(player2.racketPos == j) {
			j += player2.racketWith;

			for(var k = 0 ; j <= player2.racketWith ; k++) {
				buffer += 0xDC
			}
		} else {
			buffer += " ";
			j++;
		}
	}

	// lower border

	buffer += blEdge;

	for(var j = 0 ; j <= game.width ; j++) {
		buffer += xBorderChar;
	}

	buffer += brEdge;

	return buffer;
};