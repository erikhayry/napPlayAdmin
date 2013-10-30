/*
    based on http://net.tutsplus.com/tutorials/javascript-ajax/responsive-screenshots-with-casper/
*/



var casper = require("casper").create(),
    viewportSizes = [
        [320,480],
        [1440,900]
    ],
    baseUrl = 'http://127.0.0.1:9000/', //when running grunt server
    //url = 'http://127.0.0.1:9002/', //when running grunt test 
    urls = [
        'stats',
        'notificatios'
    ]

    saveDir = 'screenshots-viewports';
  
casper.start().each(urls, function(self, url) {
        var newUrl = baseUrl + '#/' + url;
        self.then(function(self) {
            this.each(viewportSizes, function(self, viewportSize) {
                // set two vars for the viewport height and width as we loop through each item in the viewport array
                var width = viewportSize[0],
                    height = viewportSize[1];
             
                //give some time for the page to load
                casper.wait(5000, function() {
             
                    //set the viewport to the desired height and width
                    this.viewport(width, height);
             
                    casper.thenOpen(newUrl, function() {
                        this.echo('Opening ' + newUrl + ' at ' + width);
             
                        //Set up two vars, one for the fullpage save, one for the actual viewport save
                        var FPfilename = saveDir + '/' + url + '/fullpage-' + width + ".png";
                        var ACfilename = saveDir + '/' + url + '/' + width + '-' + height + ".png";
             
                        //Capture selector captures the whole body
                        this.captureSelector(FPfilename, 'body');
             
                        //capture snaps a defined selection of the page
                        this.capture(ACfilename,{top: 0,left: 0,width: width, height: height});
                        this.echo('snapshot taken');
                    });
                });     
            });    
        });
});

 
casper.run(function() {
    this.echo('Finished captures for ').exit();
});