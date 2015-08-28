var express = require('express')
  , app = express()
  , http = require('http')
  , fs = require('fs')
  , rack = require('asset-rack')
  , path = require('path')
  , passport = require('passport')
  , package = require('./package.json')
  , cors = require("cors")
  ;
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
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

//Health check
app.get('/health.html', function(req, res, next) {
  res.send('App is running');   
});

//version check
app.get('/version.html', function(req, res, next) {
  res.send('App version is 1.0');   
});

var corsOptions = {
  credentials: true,
  origin: function(origin,callback) {
    if(origin===undefined) {
      callback(null,false);
    } else {
      // change wordnik.com to your allowed domain.
      var match = origin.match("^(.*)?.wordnik.com(\:[0-9]+)?");
      var allowed = (match!==null && match.length > 0);
      callback(null,allowed);
    }
  }
};

app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
