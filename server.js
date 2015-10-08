var express = require('express')
  , app = express()
  , http = require('http')
  , fs = require('fs')
  , rack = require('asset-rack')
  , path = require('path')
  , passport = require('passport')
  , package = require('./package.json')
  , cors = require("cors")
  , swagger = require('swagger-node-express').createNew(app)
  ;
var server = http.createServer(app);
var io = require('socket.io')(server)
var config = require('./server/config/config');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
//make it public
//app.use(express.static(__dirname + '/server/views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
app.use(new rack.JadeAsset({
  url: '/js/jadeTemplates.js',
  dirname: __dirname + '/server/views'})
);
app.use(express.logger('dev'));
app.use(express.bodyParser({limit: '50mb'}));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use( express.cookieParser());
app.use(express.session({
	secret : 'keyboard cat'
}));
// Initialize Passport! Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
app.use(app.router);

app.use('/rest', require ('./server/service/appStatus'));
app.use('/rest', require ('./server/service/userService'));
app.use('/rest', require ('./server/service/trainerService'));

//Health check
app.get('/health.html', function(req, res, next) {
  res.send('App is running');   
});

//version check
app.get('/version.html', function(req, res, next) {
  res.send('App version is 1.0');   
});

io.on('connection', function(socket){
  socket.on('instantMessage', function(msg){
    console.log('MEssage ' + JSON.stringify(msg));
    io.emit('instantMessage', msg);
  });

    socket.on('logged in', function (username) {
    console.log('Logged in user ' + username);
  });
});

server.listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
  });




