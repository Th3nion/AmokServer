// app.ts
/**
 * Heart of the Amok server, activate middlewares and start the back
 */
import express = require('express');
import bodyParser = require('body-parser');
import errorhandler = require('errorhandler');
import mongoose = require('mongoose');
import { listeners } from 'cluster';

interface Error {
  status?: number;
}

require('dotenv').config();
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

var options = { useNewUrlParser: true, useMongoClient: true };

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI, options);
} else {
  mongoose.connect(process.env.MONGODB_URI, options);
  mongoose.set('debug', true);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error whilen connecting to database'));
db.once('open', function () {
  console.log("Connection to database OK");
});

app.get('/', function (req, res) {
  res.send('Maybe you should go elsewhere ?');
});

// Add some require('./PATH/FILE_NAME')
require('./models/Monster')
require('./models/City')

app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

// // oh! pretty sure this one launch the server ;)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('listening on port ' + listener.address().port);
});
