var path = require('path'),
    root = process.env.ROOT_FOLDER,
    helpers = require(path.join(root, 'app/helpers/api_helpers'));

module.exports = function (app, firebaseRootRef) {
    app.get('/', function (req, res) {
        res.simpleJsonApiResponse(null, helpers.getSuccessApiResponse());
    });

    require(path.join(root, 'app/controllers/api/firebase')).configure(app, firebaseRootRef, helpers);
};
