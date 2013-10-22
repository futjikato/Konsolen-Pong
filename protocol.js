function CmdReader() {

	function _prepare(buffer) {
		var str = buffer.toString(),
			cmd = str.substr(0, 2),
			params = [];

		if(str.length > 2) {
			params = str.substr(2).split("\n");
		}

		return {
			cmd: cmd,
			params: params
		};
	}

	this.readUsername = function(buffer) {
		var d = _prepare(buffer);

		if(d.cmd != 'ME') {
			console.log('[PLAYER] AUTH FAILED. - err1');
			return false;
		}

		if(d.params[0].length <= 2) {
			console.log('[PLAYER] AUTH FAILED. - err2');
			return false;
		}

		return d.params[0];
	};

	this.readAuthCommand = function(buffer, player) {
		var d = _prepare(buffer);

		switch(d.cmd) {
			case 'RA':
				var newPos = d.params[0],
					pOk = d.params[1] === 'BA',
					baX = d.params[2],
					baY = d.params[3];

				break;

			default:
				console.log('[PLAYER] COMM FAILED. - err3');
				return false;
		}
	};
}

exports.getReader = function() {
	return new CmdReader();	
};