/**
 * Module dependencies.
 */
var express = require('express.io'),
    http = require('http');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
//Load configurations
var path = require('path');
// Init application
var app = express();
app.server = http.createServer(app);
app.io();
//express settings
require(path.join(process.env.ROOT_FOLDER, '/config/express'))(app);
//Bootstrap routes
require(path.join(process.env.ROOT_FOLDER, '/config/routes'))(app);
//Start the app by listening on <port>
app.listen(process.env.PORT);
console.log('Express app started on port ' + process.env.PORT + '. Environment: ' + process.env.NODE_ENV);