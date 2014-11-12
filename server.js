//--------------------------------
// Core modules
//--------------------------------
var express = require('express.io'),
    http = require('http'),
    Firebase = require('firebase'),
    path = require('path');
//--------------------------------
// Local modules
//--------------------------------
var root = process.env.ROOT_FOLDER,
    config = require(path.join(root, 'config/config'));
//--------------------------------
// Main application entry file.
// Please note that the order of loading is important.
//--------------------------------
var firebaseRootRef = new Firebase(config.firebase[process.env.NODE_ENV].url);

var app = express();
app.server = http.createServer(app);
app.io();

require(path.join(process.env.ROOT_FOLDER, '/config/express'))(app);
require(path.join(process.env.ROOT_FOLDER, '/config/routes'))(app, firebaseRootRef);

app.listen(process.env.PORT);
console.log('Express app started on port ' + process.env.PORT + '. Environment: ' + process.env.NODE_ENV);