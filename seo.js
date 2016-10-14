var fs = require('fs');
var system = require('system')
var webpage = require('./base/webpage.js')
var page = webpage.create()

var url = system.args[1]

var t = Date.now()

page.open(url, function(status) {
	page.evaluate(function() {
		console.log('PageTitle:', document.title)
		console.log('location.href:', window.location.href)

		window.magnolia && window.magnolia.autoScroll()
	});
})

page.onCallback = function(data) {
	console.log('CALLBACK:', JSON.stringify(data));

	switch(data.command){
		case 'exit':
			phantom.exit(0);
			break;

		case 'autoScrollSuccess':
			var filename = data.data.filename || encodeURIComponent(url)

			page.evaluate(function(){
				$('script').remove()
			});

			fs.write(filename+'.html', page.content, "w")
			console.log('getContent:', filename)

			t = Date.now() - t;
			console.log('Loading time ' + t + ' msec');

			phantom.exit(0);

			break;

		default:
			break;
	}
};

