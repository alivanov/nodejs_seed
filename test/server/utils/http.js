//--------------------------------
// Core modules
//--------------------------------
var path = require('path'),
    http = require('http'),
    express = require('express.io'),
    request = require('request');

function initialize_app(callback) {
    // Init application
    var app = express();
    app.server = http.createServer(app);
    app.io();
    //express settings
    require(path.join(process.env.ROOT_FOLDER, '/config/express'))(app);
    //Bootstrap routes
    require(path.join(process.env.ROOT_FOLDER, '/config/routes'))(app);
    //Start the app by listening on <port>
    app.listen(process.env.PORT, function () {
        callback(app);
    });
}
exports.initialize_app = initialize_app;

function simple_get(base_address, url, callback) {
    request.get({json: true, jar: true, url: base_address + url, followRedirect: false}, function (err, res, body) {
        if (callback) callback(err, res, body);
    });
}
exports.simple_get = simple_get;