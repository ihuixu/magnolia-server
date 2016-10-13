var commonPhantom = (function() {

	var fns = {}

	fns.exit = function(data){
		data.msg = data.msg || 'Client Request.'
		return data
	}

	function autoScroll(cbk){
		if(!checked())
			return;

		var step = 200
			, wait = 300
			//, info = 'Scrolling'
			, test = 5

		function scroll(longwait){
			//info += '.'
			//console.log(info, test)

			var t = setTimeout(function(){
				var y = window.scrollY
				window.scrollTo(0, y+step)

				if(window.scrollY == y){
					test--

					if(test == 0){
						command('autoScrollSuccess')
						cbk && cbk()

					}else{
						scroll(true)
					}

				}else{
					test = 5
					scroll()
				}

			}, wait + (longwait ? 1000 : 0))
		}

		scroll()
	}

	function command(command, data){
		if(!checked())
			return;

		if (typeof data == 'string')
			data = {msg:data}

		data = data || {}

		if(fns[command])
			data = fns[command](data)

		window.callPhantom({command:command, data:data})
	}

	function checked(){
		return !!(typeof window.callPhantom === 'function')
	}

	return {
		checked : checked
		, command : command
		, autoScroll : autoScroll
	}

})()

window.commonPhantom = commonPhantom
