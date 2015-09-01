module.exports = function() {
    var express = require('express');
    var app = express();
    var methodOverride = require('method-override');
    var user = require('../controller/userController');
    var userConnector = require('../connector/userConnector');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger());
    app.use(methodOverride('_method'));
    app.use(express.bodyParser());

	app.get('/trainer/:id', function(req, res, next) {
        console.log('user id : ' + req.params.id);
	    user.getUserbyId(req, res);
	});

    app.get('/trainers', function(req, res, next) {
        user.getAllTrainers(req, res);
    });

	return app;
}();