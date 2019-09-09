var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

// morgan is an express middleware wich log http request
// dev seems to auto-reload the run when a file has changed. To be confirmed
app.use(require('morgan')('dev'));

// body-parser is used to pre-parse request before entering in the handler
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
// no sure we will use it
app.use(require('method-override')());
// define path for public static asset such as css or image
app.use(express.static(__dirname + '/public'));

// oh! pretty sure this one launch the server ;)
var server = app.listen( process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);
  });
