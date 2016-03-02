var url = require('url');
var constructErrorMessage = require('../utils/appUtils').constructErrorMessage;
var constructSuccessMessage = require('../utils/appUtils').constructSuccessMessage;
var db = require('../dao/db');
var utils = require('../utils/appUtils');
var fs = require('fs');
var config = require('../config/config.js');
var logger = require('../log/winston');
var auditlog = require('../log/auditlog').auditlog;
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("STMP", {
   service: "Yahoo",
   auth: {
    user: 'neppoliyanthangavelu28@yahoo.com',
    pass: 'star_2828'
   }
});

var email12 = nodemailer.createTransport("SMTP", {
service: "Yahoo",
auth: {
    user: "neppoliyanthangavelu28@yahoo.com",
    pass: "star_2828"
}
});

function getUserbyId(req, res) {
    logger.info("MethodEnter: getUsers");
    if (!req.params.id) {
        res.statusCode = 400;
        res.send(constructErrorMessage("id is Mandatory", 400));
    } else {
        db.getUser(req.params.id, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
                auditlog(req, err);
            } else {
                res.statusCode = 200;
                res.send(result.value);
                auditlog(req, result.value);
            }
        });
    }
    logger.info("MethodExit: getUsers");
}

function addUser(req, res) {
    logger.info("MethodEnter: addUser");
    if (!req.body) {
        res.statusCode = 400;
        res.send(constructErrorMessage("payload is Mandatory", 400));
    } else {
        db.updateUser(req.params.id, req.body, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
                auditlog(req, err);
            } else {
                res.statusCode = 200;
                res.send(constructSuccessMessage("Updated/Inserted Successfully", 200, result));
                auditlog(req, "Success");
            }
        });
    }
    logger.info("MethodExit: addUser");
}

function register(req, res) {
    logger.info("MethodEnter: register");
    if (!req.body) {
        res.statusCode = 400;
        res.send(constructErrorMessage("payload is Mandatory", 400));
    } else {
        var id = utils.userToken(req.body.email, req.body.password);
        console.log("User Added : " + id + "Email : " + req.body.email);
        logger.info("User Added : " + id + "Email : " + req.body.email);
        req.body.id = id;
        req.body._id = id;
        req.body.isValid = true;
        db.updateUser(id, req.body, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
                auditlog(req, err);
            } else {
                res.statusCode = 200;
                res.send(req.body);
                auditlog(req, res.body);
            }
        });
    }
    logger.info("MethodExit: register");
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
                auditlog(req, err);
            } else {
                res.statusCode = 200;
                res.send(result.value);
                auditlog(req, result.value);
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
                auditlog(req, err);
            } else {
                res.statusCode = 200;
                res.send(constructSuccessMessage("Deleted Successfully", 200, result));
                auditlog(req, "Delete Successfully");
            }
        });
    }
}

function getAllTrainers(req, res) {
    db.getAllTrainers(function(err, result) {
        if (err || !result) {
            res.statusCode = 500;
            console.log(err);
            console.log(result);
            res.send(constructErrorMessage(err, 500));
        } else {
            res.statusCode = 200;
            var resValue = [];
            for(var i=0;i<result.length;i++){
                resValue.push(result[i].value);
            }
            res.send(resValue);
            auditlog(req, resValue);
        }
    });
}

function subscribe(req, res) {
    var body = req.body;
    var trainerId = body.trainerId + 'Trainees';
    db.getUser(body.id, function(err, result) {
        if (err || !result) {
            auditlog(req, "Not Updated Trainee with trainer detail");auditlog(req, "Updated Trainee with trainer detail");
        } else {
            result.value.trainerId = body.trainerId;
            result.value.trainerName = body.trainerName;
            db.updateUser(body.id, result.value, function(err, result) {
                if (err || !result) {
                    auditlog(req, "Not Updated Trainee with trainer detail");
                } else {
                    auditlog(req, "Updated Trainee with trainer detail");
                }
            });
        }
    });

    db.getUser(trainerId, function(err, result) {
        if (err || !result) {
            auditlog(req, "Not Updated Trainer with trainee detail");
        } else {
            var newID = {};
            newID.id = body.id;
            newID.name = body.name;
            result.value.trainees.push(newID);
            
            db.updateUser(trainerId, result.value, function(err, result) {
                if (err || !result) {
                    auditlog(req, "Not Updated Trainer with trainee detail");
                } else {
                    auditlog(req, "Updated Trainer with trainee detail");
                }
            });
        }
    });

    res.statusCode = 200;
    res.send(req.body);
    auditlog(req, "Success");
}

function savePicture(req, res) {
    var dir = config.dir + req.params.id + ".png";
    console.log("Request body:" + JSON.stringify(req.body));
    var data = req.body.imageData || req.body.body.imageData;
    fs.writeFile(dir, data, 'binary', function(err){
        if (err) throw err
        console.log('File saved.')
    });
    res.statusCode = 200;
    res.send("Success");
    auditlog(req, "Success");
}

function getPicture(req, res) {
    var dir = config.dir + req.params.id + ".png";
    fs.readFile(dir, function (err, data) {
        var data1 = {};
        if (err) {
            res.statusCode = 400;
            res.send("Error");
        } else {
            res.statusCode = 200;
            res.setHeader('content-type', 'image/png');
            res.send(data);
            auditlog(req, "Success");
        }
    });
}

function sendEmail(req, res) {
    logger.info("inside sendEmail");
    var mailOptions = {
        from: req.body.from, 
        to: req.body.to, 
        subject: req.body.subject,  
        text: req.body.body, 
        html: req.body.html 
    };
    email12.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

function suggestion(req, res) {
    logger.info("MethodEnter: suggestion");
    if (!req.body) {
        res.statusCode = 400;
        res.send(constructErrorMessage("payload is Mandatory", 400));
    } else {
        var id = "suggestionList";
        db.getUser(id, function(err, results) {
            console.log(results.value);
            var sugestionlist = results.value;
            sugestionlist.suggestionList.push(req.body);
            console.log(sugestionlist);
            db.updateUser(id, sugestionlist, function(err, result) {
                res.statusCode = 200;
                res.send("Success");
                auditlog(req, "Success");
            });
        });
        
    }
    logger.info("MethodExit: suggestion");
}

function gettrainees(req, res) {
    logger.info("MethodEnter: trainees");

    var id = req.params.id + "Trainees";
    db.getUser(id, function(err, results) {
        console.log(results.value);
        res.statusCode = 200;
        res.send(results.value);
        auditlog(req, results.value);
    });
        
}

function getMessages(req, res) {
    logger.info("MethodEnter: getMessages");
    var id = req.params.id;
    db.getMessages(id, function(err, results) {
        res.statusCode = 200;
        res.send(results.value);
        auditlog(req, results.value);
    });    
}

function putMessages(req, res) {
    logger.info("MethodEnter: getMessages");
    var id = req.params.id;
    db.getMessages(id, function(err, results) {
        results.value.push(req.body);
        db.putMessages(id, req.body, function(err, results) {
            res.statusCode = 200;
            res.send(results.value);
            auditlog(req, "Successfully Updated");
        });
    });    
}

module.exports.getUserbyId = getUserbyId;
module.exports.addUser = addUser;
module.exports.deleteUserbyId = deleteUserbyId;
module.exports.login = login;
module.exports.register = register;
module.exports.getAllTrainers = getAllTrainers;
module.exports.savePicture = savePicture;
module.exports.getPicture = getPicture;
module.exports.sendEmail = sendEmail;
module.exports.suggestion = suggestion;
module.exports.gettrainees = gettrainees;
module.exports.subscribe = subscribe;
module.exports.getMessages = getMessages;
module.exports.putMessages = putMessages;

