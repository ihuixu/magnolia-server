(function (window) {
	'use strict';

	!window.magnolia && (window.magnolia = {});

	window.magnolia.autoScroll = autoScroll

	function autoScroll(cbk){
		if(!magnolia.checked())
			return;

		var step = 100
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
						magnolia.command('autoScrollSuccess')
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

}(window));
