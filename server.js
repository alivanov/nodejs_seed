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
var path = require('path'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config');

process.env.rootFolder = config.root;

// Init application
var app = express();
app.server = http.createServer(app);
app.io();

//express settings
require(path.join(process.env.rootFolder, '/config/express'))(app);
//Bootstrap routes
require(path.join(process.env.rootFolder, '/config/routes'))(app);

//Start the app by listening on <port>
app.listen(config.port);
console.log('Express app started on port ' + config.port + '. Environment: ' + env);