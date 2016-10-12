var page = require('webpage').create()
var system = require('system')

var url = "http://xhpages.fex.lehe.com/glk/3025"
//var url = 'http://xhstatic.lehe.com/fex/pages/src/loader.js?201601012.1476266412'

var t = Date.now()

var address = system.args[1] || url

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));

};

/*
page.onResourceRequested = function(request) {
  console.log('Request ' + request.url + ' ====== ' + JSON.stringify(request));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + request.url + ' ====== ' + JSON.stringify(response));
};
*/

page.onInitialized = function() {
  page.evaluate(function() {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM content has loaded.');

			if (typeof window.callPhantom === 'function') {
				window.callPhantom({ hello: 'world' });
			}

    }, false);
  });
};

page.onCallback = function(data) {
  console.log('CALLBACK: ' + JSON.stringify(data));
  // Prints 'CALLBACK: { "hello": "world" }'
};

page.open(address, function(status) {
	page.evaluate(function() {
    console.log('Page title is ' + document.title);
  });


  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    t = Date.now() - t;
    console.log('Loading ' + address);
    console.log('Loading time ' + t + ' msec');
//		console.log(page.content)
  }

//	page.render('app.jpg', {format: 'jpg', quality: '100'});

	phantom.exit();
})

