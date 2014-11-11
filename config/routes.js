var path = require('path'),
    root = process.env.ROOT_FOLDER,
    helpers = require(path.join(root, 'app/helpers/api_helpers'));

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.simpleJsonApiResponse(null, helpers.getSuccessApiResponse());
    });
};
