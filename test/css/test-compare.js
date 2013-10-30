var phantomcss = require('scripts/phantomcss.js'),
	page = require('webpage').create();

phantomcss.init({
	screenshotRoot: 'screenshots',
	failedComparisonsRoot: 'failures'
});

var casper = require("casper").create();
//var url = 'http://127.0.0.1:9000/'; //when running grunt server
var url = 'http://127.0.0.1:9002/'; //when running grunt test
 
casper
	.start(url)
	/*.then(function(){
		this.page.injectJs('./test/css/template.js');
	})
	.thenOpen('http://127.0.0.1:9000/#/test/template/app-nav', function() {
	    this.echo(this.getGlobal('location').href);
	})*/
	.then(function(){
		phantomcss.screenshot('.m-app-nav', 'm-app-nav');
		phantomcss.screenshot('.m-app-nav-item', 'm-app-nav-item');
	})
	.then( function now_check_the_screenshots(){
		phantomcss.compareAll();
	}).
	run( function end_it(){
		console.log('\nTHE END.');
		phantom.exit(phantomcss.getExitStatus());
	});


casper.run(function() {
    //this.echo('Everything in the stack has ended.').exit();
});

