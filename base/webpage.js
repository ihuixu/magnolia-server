var webpage = require('webpage')
var clientJS = fs.read('./client/common.js')

exports.create = function(){
	var page = webpage.create()

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

	return page
}
