var fs = require('fs'),
	q = require('q'),
	screenshotDir = "./screenshots-viewports",
	imageUrls = {},
	getLatestScreenshots = function() {
	  	var deferred = q.defer(),
	  		latestUrl = {id : 0};

		fs.readdir(screenshotDir, function(error, subDirs){
			
			if(error) {
			    console.error("Unable to read files in " + screenshotDir + " " + error.message);
			    return;
			}

			for (var i = 0; i < subDirs.length; i++) {
				var subDir = subDirs[i],
					id = parseInt(subDir.substr(0, subDir.indexOf('-')));
				
				if(id > latestUrl.id) {
					latestUrl.id = id;
					latestUrl.path = screenshotDir + '/' + subDir;
				}
			};

			fs.readdir(latestUrl.path, function(error, dirs){
				if(error) {
				    console.error("Unable to read files in subdir" + " " + error.message);
				    return;
				}
				var imagePaths = []

				for (var j = 0; j < dirs.length; j++) {

					(function(dir, isLast, path) {
						if(dir.indexOf('.') != 0){ //ignore hidden files					
							fs.readdir(path, function(error, images){

								if(error) {
								    console.error("Unable to read files in subdir" + " " + error.message);
								    return;
								}
								var tempArr = [];
								
								for (var k = 0; k < images.length; k++) {
									tempArr.push(path + '/' + images[k])
								};

								imagePaths.push([dir, tempArr]);

								if(isLast) deferred.resolve(imagePaths);	

							});
						}

				    })(dirs[j], (j == dirs.length - 1), latestUrl.path + '/' + dirs[j]);
				};
			});
		})
	  	return deferred.promise;
	},
	buildHtml = function(screenshots){
		var deferred = q.defer(),
			htmlObject = {},
			getHtml = function(){
				var html = '';
				for(var section in htmlObject){
					var sectionHtml = '<h2>' + section + '</h2>',
						imagesHtml = '';
					
					for (var i = 0; i < htmlObject[section].length; i++) {
						imagesHtml = imagesHtml + htmlObject[section][i]
					};
					html = html + sectionHtml + imagesHtml;
				}
				return html;
			}



		for (var i = 0; i < screenshots.length; i++) {
			(function(section, images, isLast){
				console.log(section)
			    htmlObject[section] = []

				for (var j = 0; j < images.length; j++) {
					(function(image, section, isLast){
						fs.readFile(image, function(err, data) {
							var base64data = new Buffer(data).toString('base64');
							var imageTag = '<img src="data:image/gif;base64,' + base64data + '" />';
							htmlObject[section].push(imageTag)
							if(isLast) {
								var html = getHtml();
								deferred.resolve(html);
							}				  
						});
					})(images[j], section, (isLast && (j == images.length - 1)))
				};

			})(screenshots[i][0], screenshots[i][1], (i == screenshots.length - 1))
		};
		return deferred.promise;
	};

getLatestScreenshots().then(function(data) {
	buildHtml(data).then(function(html){
		fs.writeFile("test.html", html, function(err) {
							    if(err) {
							        console.log(err);
							    } else {
							        sendEmail("test.html")
							    }
							});

	})


});

 

//https://npmjs.org/package/postmark
function sendEmail(file){
	var postmark = require("postmark")("POSTMARK_API_TEST");
	    postmark.send({
	        "From": "erik.portin@net-a-porter.com", 
	        "To": "erikportin@gmail.com", 
	        "Subject": "Test", 
	        "TextBody": "Test Message",
	        "Attachments": [
		        {
		            "Name": "test.html",
					"Content": "dGVzdCBjb250ZW50",
      				"ContentType": "text/html"
		        }
		    ]
	    }, function(error, success) {
	        if(error) {
	            console.error("Unable to send via postmark: " + error.message);
	            return;
	        }
	        console.info("Sent to postmark for delivery")
	    });
}
