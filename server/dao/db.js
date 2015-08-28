var couchbase = require("couchbase");
var config = require('../config/config.js');
var ViewQuery = couchbase.ViewQuery;
var N1qlQuery = couchbase.N1qlQuery;
var query = ViewQuery.from('user', 'by_email');
var sqlQuery = N1qlQuery.fromString('SELECT * FROM ' + config.couchBase.bucketName);
var db;

function initDb(){
    var cluster = new couchbase.Cluster(config.couchBase.server);
    db = cluster.openBucket(config.couchBase.bucketName,config.couchBase.bucketPassword);
}

function getDb(){
    if(!db) {
        initDb();
    }
}

function getMultiUser(keys, callback) {
    getDb();        
    db.getMulti(keys, function(err, results) {
        callback(err, results);
    });
}

function getUser(key, callback) {
    getDb();        
    db.get(key, function(err, results) {
        callback(err, results);
    });    
}

function deleteUser(key, callback) {
    getDb();        
    db.remove(key, function(err, results) {
        callback(err, results);
    });    
}

function updateUser(key, val, callback) {
    getDb();        
    db.upsert(key, val, function(err, results) {
        callback(err, results);
    });    
}

function getAllUser(callback) {
    db.query(sqlQuery, function(err, res) {
        callback(err, res);
    });
}


module.exports.getMultiUser = getMultiUser;
module.exports.getUser = getUser;
module.exports.getAllUser = getAllUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;

