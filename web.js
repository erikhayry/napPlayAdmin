//http://www.sitepoint.com/deploying-yeomanangular-app-heroku/

/*
	server file: web.js
	- used for serve up our site on heroku using Gzippo and Express
*/

var gzippo = require('gzippo');
var express = require('express');
var app = express();
 
app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);