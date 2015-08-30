var url = require('url');
var constructErrorMessage = require('../utils/appUtils').constructErrorMessage;
var constructSuccessMessage = require('../utils/appUtils').constructSuccessMessage;
var db = require('../dao/db');
var utils = require('../utils/appUtils');

function getUserbyId(req, res) {

    if (!req.params.id) {
        res.statusCode = 400;
        res.send(constructErrorMessage("id is Mandatory", 400));
    } else {
        db.getUser(req.params.id, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
            } else {
                res.statusCode = 200;
                res.send(result.value);
            }
        });
    }
}

function addUser(req, res) {
    if (!req.body) {
        res.statusCode = 400;
        res.send(constructErrorMessage("payload is Mandatory", 400));
    } else {
        db.updateUser(req.params.id, req.body, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
            } else {
                res.statusCode = 200;
                res.send(constructSuccessMessage("Updated/Inserted Successfully", 200, result));
            }
        });
    }
}

function register(req, res) {
    if (!req.body) {
        res.statusCode = 400;
        res.send(constructErrorMessage("payload is Mandatory", 400));
    } else {
        var id = utils.userToken(req.body.email, req.body.password);
        console.log("user id : " + id);
        req.body.id = id;
        req.body.isValid = true;
        db.updateUser(id, req.body, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
            } else {
                res.statusCode = 200;
                res.send(req.body);
            }
        });
    }
}

function login(req, res) {
    if (!req.body) {
        res.statusCode = 400;
        res.send(constructErrorMessage("payload is Mandatory", 400));
    } else {
        var id = utils.userToken(req.body.email, req.body.password);
        console.log("user id : " + id);
        req.body.id = id;
        db.getUser(id, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
            } else {
                res.statusCode = 200;
                res.send(result.value);
            }
        });
    }
}

function deleteUserbyId(req, res) {
    if (!req.params.id) {
        res.statusCode = 400;
        res.send(constructErrorMessage("id is Mandatory", 400));
    } else {
        db.deleteUser(req.params.id, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
            } else {
                res.statusCode = 200;
                res.send(constructSuccessMessage("Deleted Successfully", 200, result));
            }
        });
    }
}

module.exports.getUserbyId = getUserbyId;
module.exports.addUser = addUser;
module.exports.deleteUserbyId = deleteUserbyId;
module.exports.login = login;
module.exports.register = register;

