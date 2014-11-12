//--------------------------------
// Core modules
//--------------------------------
var path = require('path'),
    http = require('http'),
    express = require('express.io'),
    Firebase = require('firebase'),
    request = require('request');

//--------------------------------
// Local modules
//--------------------------------
var root = process.env.ROOT_FOLDER,
    config = require(path.join(root, 'config/config'));

function initialize_app(callback) {
    var firebaseRootRef = new Firebase(config.firebase[process.env.NODE_ENV].url);

    var app = express();
    app.server = http.createServer(app);
    app.io();

    require(path.join(process.env.ROOT_FOLDER, '/config/express'))(app);
    require(path.join(process.env.ROOT_FOLDER, '/config/routes'))(app, firebaseRootRef);

    app.listen(process.env.PORT, function () {
        callback(app, firebaseRootRef);
    });
}
exports.initialize_app = initialize_app;

function simple_get(base_address, url, callback) {
    request.get({json: true, jar: true, url: base_address + url, followRedirect: false}, function (err, res, body) {
        if (callback) callback(err, res, body);
    });
}
exports.simple_get = simple_get;