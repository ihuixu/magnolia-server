var fs = require('fs');
var system = require('system')
var page = require('./base/page.js').create()
var clientJS = fs.read('./client/common.js')

var url = system.args[1]

var t = Date.now()

page.open(url, function(status) {
	page.evaluate(function() {
		console.log('PageTitle:', document.title);
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
			page.render(filename+'.jpg',{format: 'jpg', quality: '100'});

			t = Date.now() - t;
			console.log('Loading time ' + t + ' msec');

			phantom.exit(0);

			break;

		default:
			break;
	}
};

