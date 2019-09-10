// app.ts
/**
 * Heart of the Amok server, activate middlewares and start the back
 */
import express = require('express');
import bodyParser = require('body-parser');
import errorhandler = require('errorhandler');
import mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === "production";

const app: express.Application = express();

// // morgan is an express middleware wich log http request
// // dev seems to auto-reload the run when a file has changed. To be confirmed
app.use(require('morgan')('dev'));

// // body-parser is used to pre-parse request before entering in the handler
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
// // no sure we will use it
app.use(require('method-override')());

// // define path for public static asset such as css or image
app.use(express.static(__dirname + '/public'));

// display more errors in logs
if (!isProduction) {
  app.use(errorhandler());
}

// for mongoDB

var options = { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } };

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI, options);
} else {
  mongoose.connect('mongodb://localhost/amok', options);
  mongoose.set('debug', true);
}

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function () {
    console.log("Connexion à la base OK"); 
}); 

app.get('/', function (req, res) {
  res.send('Hello World! 3');
});

// Add some require('./PATH/FILE_NAME')

app.use(require("../routes"));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// // oh! pretty sure this one launch the server ;)
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
