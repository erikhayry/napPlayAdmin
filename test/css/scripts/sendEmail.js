var fs = require('fs'),
	q = require('q'),
	screenshotDir = './screenshots-viewports',
	imageUrls = {},
	latestUrl = {id : 0};

	getLatestScreenshots = function() {
	  	var deferred = q.defer();
	  		
		fs.readdir(screenshotDir, function(error, subDirs){
			
			if(error) {
			    console.error('Unable to read files in ' + screenshotDir + ' ' + error.message);
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
				    console.error('Unable to read files in subdir' + ' ' + error.message);
				    return;
				}
				var imagePaths = []

				for (var j = 0; j < dirs.length; j++) {

					(function(dir, isLast, path) {
						if(dir.indexOf('.') != 0){ //ignore hidden files					
							fs.readdir(path, function(error, images){

								if(error) {
								    console.error('Unable to read files in subdir' + ' ' + error.message);
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
			    htmlObject[section] = [];

				for (var j = 0; j < images.length; j++) {
					var str = images[j];
					var str = str.substr( (str.lastIndexOf('/')+1) )
					var imageTag = '<img src="' + section + '-' + str + '" />';
					htmlObject[section].push(imageTag);
					archive.append(fs.createReadStream(images[j]), { name: section + '-' + str })
				};

				var html = getHtml();
				deferred.resolve(html);

			})(screenshots[i][0], screenshots[i][1], (i == screenshots.length - 1))
		};
		return deferred.promise;
	};

var archiver = require('archiver');

var output = fs.createWriteStream('./example-output.zip');
var archive = archiver('zip');

output.on('close', function() {
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

getLatestScreenshots().then(function(data) {
	buildHtml(data).then(function(html){
 		console.log(html)
 		fs.writeFile('index.html', html, function (err) {
		  if (err) throw err;
 			archive.append(fs.createReadStream('index.html'), { name: 'index.html' });

			archive.finalize(function(err, bytes) {
		  		if (err) {
		    		throw err;
		  		}

		  	console.log(bytes + ' total bytes');
		  	sendEmail()

		});		
	});



	})
});



//https://npmjs.org/package/postmark
function sendEmail(){
	var to = process.argv[2],
		api = process.argv[3] || 'POSTMARK_API_TEST',
		postmark = require('postmark')(api);


		fs.readFile('./example-output.zip', function(err, data) {
		   	var base64data = new Buffer(data).toString('base64');
		    postmark.send({
		        'From': 'erik.portin@net-a-porter.com', 
		        'To': to, 
		        'Subject': 'Test', 
				'TextBody': 'test',
		        'Attachments': [
			        {
			            'Name': 'previewer.zip',
						'Content': base64data,
		  				'ContentType': 'application/octet-stream'
			        }
			    ]
		    }, function(error, success) {
		        if(error) {
		            console.error('Unable to send via postmark: ' + error.message);
		            return;
		        }
		        console.info('Sent to postmark for delivery to ' + to)
		    });		
		});



}
