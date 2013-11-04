var fs = require('fs'),
	q = require('q'),
	screenshotDir = './screenshots-viewports',
	imageUrls = {},
	latestUrl = {id : 0},
	zipFilePath = './screenshots-viewports.zip',
	htmlFilePath = 'index.html';

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
				var imagePaths = [],
					undoneFolders = [];

				for (var j = 0; j < dirs.length; j++) {
					
					
					(function(dir, isLast, path) {
						if(dir.indexOf('.') != 0){ //ignore hidden files
							undoneFolders.push(dir)					
							
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
								undoneFolders.splice(undoneFolders.indexOf(dir), 1);

								if(isLast) {
									if(undoneFolders.length == 0) deferred.resolve(imagePaths);
									else {
										 function wait(){
										 	setTimeout(function(){
										 		if(undoneFolders.length == 0) deferred.resolve(imagePaths);
										 		else wait();
										 	}, 1000)
										 }
									}
								}	

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

		var undoneSections = [],
			done = function(){
				var html = getHtml();
				deferred.resolve(html);		
			};	

		for (var i = 0; i < screenshots.length; i++) {
			(function(section, images, isLast){
				undoneSections.push[section]
			    htmlObject[section] = [];

				for (var j = 0; j < images.length; j++) {
					var str = images[j];
					var str = str.substr( (str.lastIndexOf('/')+1) )
					var imageTag = '<img src="' + section + '-' + str + '" />';
					htmlObject[section].push(imageTag);
					
					archive.append(fs.createReadStream(images[j]), { name: section + '-' + str })
				};

				undoneSections.splice(undoneSections.indexOf(section), 1);
				
				if(isLast){
					if(undoneSections.length == 0) done();
					else {
						 function wait(){
						 	setTimeout(function(){
						 		if(undoneSections.length == 0) done();
						 		else wait();
						 	}, 1000)
						 }
					}

				}
			})(screenshots[i][0], screenshots[i][1], (i == screenshots.length - 1))
		};
		return deferred.promise;
	};

var archiver = require('archiver');

var output = fs.createWriteStream(zipFilePath);
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
 		fs.writeFile(htmlFilePath, html, function (err) {
		  if (err) throw err;
 			archive.append(fs.createReadStream(htmlFilePath), { name: htmlFilePath });

			archive.finalize(function(err, bytes) {
		  		if (err) {
		    		throw err;
		  		}

			  	fs.unlinkSync(htmlFilePath)

			  	//sendEmail()

			});		
		});
	})
});



//https://npmjs.org/package/postmark
function sendEmail(){
	var to = process.argv[2],
		api = process.argv[3] || 'POSTMARK_API_TEST',
		postmark = require('postmark')(api);


		fs.readFile(zipFilePath, function(err, data) {
		   	
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
		  				'ContentType': 'application/zip'
			        }
			    ]
		    }, function(error, success) {
		        if(error) {
		            console.error('Unable to send via postmark: ' + error.message);
		            return;
		        }
		        console.info('Sent to postmark for delivery to ' + to)
		        fs.unlinkSync(zipFilePath)
		    });		

		});



}
