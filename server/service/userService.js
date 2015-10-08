module.exports = function() {
    var express = require('express');
    var app = express();
    var methodOverride = require('method-override');
    var user = require('../controller/userController');
    var userConnector = require('../connector/userConnector');
    var logger = require('../log/winston');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger());
    app.use(methodOverride('_method'));
    app.use(express.bodyParser());

	app.get('/user/:id', function(req, res, next) {
        console.log('user id : ' + req.params.id);
	    user.getUserbyId(req, res);
	});

    app.get('/users', function(req, res, next) {
        console.log('user id : ' + req.params.id);
        userConnector.getUsers(req, res);
    });

	app.put('/user/:id', function(req, res, next) {
	    console.log('user id : ' + req.params.id);
        console.log('user payload : ' + req.body);
        user.addUser(req, res);     
	});

    app.post('/user/:id', function(req, res, next) {
        console.log('user id : ' + req.params.id);
        console.log('user payload : ' + req.body);
        user.addUser(req, res);     
    });

    app.delete('/user/:id', function(req, res, next) {
        console.log('user id : ' + req.params.id);
        user.deleteUserbyId(req, res);      
    });

    app.post('/login', function(req, res, next) {
        user.login(req, res);   
    });

    app.put('/login/:id', function(req, res, next) {
        user.register(req, res);    
    });

    app.post('/register', function(req, res, next) {
        logger.info("User Added : " + req.body);
       user.register(req, res);  
    });

    app.put('/register/:id', function(req, res, next) {
       user.register(req, res);  
    });

    app.get('/register/:id', function(req, res, next) {
       user.getUserbyId(req, res);  
    });

    app.get('/workout/:id', function(req, res, next) {
        console.log('user id : ' + req.params.id);
        user.getUserbyId(req, res);
    });

    app.put('/picture/:id', function(req, res, next) {
        console.log('user id : ' + req.params.id);
        user.savePicture(req, res);
    });

    app.get('/picture/:id', function(req, res, next) {
        console.log('user id : ' + req.params.id);
        user.getPicture(req, res);
    });

    app.post('/sendemail/:id', function(req, res, next) {
        user.sendEmail(req, res);
    });

    app.post('/suggestion', function(req, res, next) {
        user.suggestion(req, res);
    });

    app.post('/subscribe', function(req, res, next) {
        logger.info("Body : " + req.body);
        user.subscribe(req, res);
    });

    app.put('/suggestion', function(req, res, next) {
        user.suggestion(req, res);
    });


	return app;
}();