var constructErrorMessage = require('../utils/appUtils').constructErrorMessage;
var constructSuccessMessage = require('../utils/appUtils').constructSuccessMessage;
var request = require('../connector/RequestAPI');
var config = require('../config/config.js');

function getUsers(req, res) {
    var uri = config.connectorUrl;
    request.requestApi(uri, null, "GET", null, function(err, res1) {
        res.statusCode=res1.statusCode;
        res.send(res1.body);
    });
}

module.exports.getUsers = getUsers;