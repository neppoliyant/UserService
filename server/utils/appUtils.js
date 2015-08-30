var config = require('../config/config.js');
var crypto = require('crypto');

function constructErrorMessage(errorMessage, status) {
    var obj = {};
    obj.status = status;
    obj.error = true;
    obj.message = errorMessage;
    return obj;
}

function constructSuccessMessage(message, status, body) {
    var obj = {};
    obj.status = status;
    obj.error = false;
    obj.message = message;
    obj.body = body;
    return obj;
}

function userToken (user, password) {
    var userCombo = user + ':' + password;  
    var key = config.secret || 'x3efs2r3kdsnvsdvs32r322poujhdue388';
    var hash = crypto.createHmac('sha1', key).update(userCombo).digest('base64');
    return hash;
}

module.exports.constructErrorMessage = constructErrorMessage;
module.exports.constructSuccessMessage = constructSuccessMessage;
module.exports.userToken = userToken;