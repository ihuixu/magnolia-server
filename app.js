var fs = require('fs')
var fs = require('fs');

// Print the directory from which phantomjs was run:
var cwd = fs.absolute(".");
console.log(cwd);

var urls = [
	"http://xhpages.fex.lehe.com/glk/5399"
	, "http://xhpages.fex.lehe.com/glk/1359"
	, "http://xhpages.fex.lehe.com/glk/3025"
]
var url = urls[2]

var t = Date.now()
var page = require('webpage').create()

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
	page.evaluate(function() {
	})
}

function render(data){
	var filename = data.data.filename || encodeURIComponent(url)
	page.render(filename+'.jpg',{format: 'jpg', quality: '100'});
}

function getContent(data){
	var filename = data.data.filename || encodeURIComponent(url)

	page.evaluate(function(){
		$('script').remove()
	});

	fs.write(filename+'.html', page.content, "w")
	console.log('getContent:', filename)
}

page.onCallback = function(data) {
	console.log('CALLBACK:', JSON.stringify(data));

	switch(data.command){
		case 'exit':
			phantom.exit(0);
			break;

		case 'getContent':
			getContent(data)
			break;

		case 'autoScrollSuccess':
			//render(data)
			getContent(data)
			break;

		case 'render':
			render(data)
			break;

		default:
			break;
	}
};

page.open(url, function(status) {
	page.evaluate(function() {
		console.log('PageTitle:', document.title);
	});

	if (status !== 'success') {
		console.log('FAIL to load the address');
	} else {
		t = Date.now() - t;
		console.log('Loading ' + address);
		console.log('Loading time ' + t + ' msec');
	}
})

