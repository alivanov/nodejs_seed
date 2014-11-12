/*jshint expr: true*/
/*exported should */
//--------------------------------
// Core modules
//--------------------------------
var path = require('path');
//--------------------------------
// Local modules
//--------------------------------
var root = process.env.ROOT_FOLDER;
var http_test_utils = require(path.join(root, '/test/server/utils/http'));

describe('HTTP tests:', function () {
    var app = null;
    var base_address = 'http://127.0.0.1:' + process.env.PORT;

    before(function (done) {
        // Initialize Express app and start server in test mode
        http_test_utils.initialize_app(function (new_app) {
            app = new_app;
            done();
        });
    });

    describe('root controller', function () {
        it('should serve the root url', function (done) {
            var url = '';
            http_test_utils.simple_get(base_address, url, function (err, res, body) {
                body.status.should.be.equal('success');
                body.data.should.be.eql({});
                done();
            });
        });
    });

    describe('page not fount error', function () {
        it('should serve requests with incorrect urls', function (done) {
            var url = '/not_exist';
            http_test_utils.simple_get(base_address, url, function (err, res, body) {
                res.statusCode.should.be.equal(404);
                body.should.be.ok;
                done();
            });
        });
    });

    after(function (done) {
        app.server.close(function () {
            done();
        });
    });
});


