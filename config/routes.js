var path = require('path'),
    root = process.env.rootFolder,
    helpers = require(path.join(root, 'app/helpers/api_helpers'));

module.exports = function (app) {

    app.get('/', function (req, res) {
        console.log('request received!!!');
        res.simpleJsonApiResponse(null, helpers.getSuccessApiResponse());
    });

};
