(function (window) {
	'use strict';

	!window.magnolia && (window.magnolia = {});

	window.magnolia.command = command

	var fns = {}

	fns.exit = function(data){
		data.msg = data.msg || 'Client Request.'
		return data
	}

	function command(command, data){
		if(!magnolia.checked())
			return;

		if (typeof data == 'string')
			data = {msg:data}

		data = data || {}

		if(fns[command])
			data = fns[command](data)

		window.callPhantom({command:command, data:data})
	}

}(window));
