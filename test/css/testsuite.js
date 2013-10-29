
var phantomcss = require('phantomcss.js');

phantomcss.init({
	screenshotRoot: 'screenshots',
	failedComparisonsRoot: 'failures'
});

var casper = require("casper").create();
var url = 'http://127.0.0.1:9000/';
 
casper
	.start(url)
	.then(function(){
		this.echo('Hello, World! The Page title on '+ url +' is ' + this.getTitle());
		phantomcss.screenshot('.m-app-nav', 'm-app-nav');
		//phantomcss.screenshot('.m-app-nav-item', 'm-app-nav-item');
	});

casper.
	then( function now_check_the_screenshots(){
		phantomcss.compareAll();
	}).
	run( function end_it(){
		console.log('\nTHE END.');
		phantom.exit(phantomcss.getExitStatus());
	});


casper.run(function() {
    //this.echo('Everything in the stack has ended.').exit();
});

