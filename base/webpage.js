var webpage = require('webpage')
var fs = require('fs')

var clientJS = ''
var clientJSBase = './client'
var clientJSList = fs.list(clientJSBase)

for(var i in clientJSList){
	var filePath = clientJSBase + '/' + clientJSList[i]
	if(fs.isFile(filePath)){
		clientJS += fs.read(filePath)
	}
}

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
