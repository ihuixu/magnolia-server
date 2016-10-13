var fs = require('fs');
var system = require('system')
var page = require('webpage').create()
var clientJS = fs.read('./client/common.js')

var url = system.args[1]

var t = Date.now()

page.onConsoleMessage = function(msg) {
	console.log('ConsoleMessage:', msg);
};

page.onError = function(msg, trace) {

	var msgStack = ['ERROR: ' + msg];

	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
			msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
		});
	}

	console.error('Error:', msgStack.join('\n'));

};

page.onInitialized = function() {
	page.evaluateJavaScript('function(){'+clientJS+'}')
}

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

