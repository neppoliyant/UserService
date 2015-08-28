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

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
//make it public
app.use(express.static(__dirname + '/server/views'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
app.use(new rack.JadeAsset({
  url: '/js/jadeTemplates.js',
  dirname: __dirname + '/server/views'})
);
app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
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

swagger.setAppHandler(app);

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

var models = require("./server/utils/swagger_models.js");
var resources = require("./server/utils/swagger_resources.js");
swagger.addModels(models)
  .addGet(resources.getUser)
  .addPut(resources.putUser)
  .addPost(resources.postUser)
  .addDelete(resources.deleteUser)
  ;
  

swagger.configureDeclaration("Services", {
    description : "Detials for Mobile Users",
    produces: ["application/json"]
  });

//set api info
swagger.setApiInfo({
  title: "User Server",
  description: "This is the User Application Server, primarily the backend for the mobile client"
});

//Configures the app's base path and api version.
swagger.configureSwaggerPaths("http://localhost:3000", "api-docs", "")
swagger.configure("http://localhost:3000/rest", "1.0");


//Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/node_modules/swagger-node-express/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});
app.listen(8002);

//version check
app.get('/Swagger', function(req, res, next) {
  res.render('index.html');   
});



server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
