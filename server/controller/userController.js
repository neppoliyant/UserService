var url = require('url');
var constructErrorMessage = require('../utils/appUtils').constructErrorMessage;
var constructSuccessMessage = require('../utils/appUtils').constructSuccessMessage;
var db = require('../dao/db');

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
                res.send(constructSuccessMessage("Success", 200, result));
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

