//--------------------------------
// Core modules
//--------------------------------
var path = require('path');
var firebase = require('firebase');
//--------------------------------
// Local modules
//--------------------------------
var root = process.env.ROOT_FOLDER;

exports.configure = function (app, helpers) {

    app.get('/api/v1/firebase', function (req, res) {
        res.simpleJsonApiResponse(null, helpers.getSuccessApiResponse('firebase is here!'));
    });
};
