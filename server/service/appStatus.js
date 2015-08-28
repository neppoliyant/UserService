module.exports = function() {
    var express = require('express');
    var app = express();
    var methodOverride = require('method-override');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger());
    app.use(methodOverride('_method'));
    app.use(express.bodyParser());

    //Health check
	app.get('/health.html', function(req, res, next) {
	  res.json({ message: 'User Service is running' });   
	});

	//version check
	app.get('/version.html', function(req, res, next) {
	  res.json({ message: 'User Service version is 1.0' });   
	});

	return app;
}();