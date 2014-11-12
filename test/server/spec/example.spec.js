/*jshint expr: true*/
/*exported should */
//--------------------------------
// Core modules
//--------------------------------
var path = require('path');
var sinon = require('sinon');
//--------------------------------
// Local modules
//--------------------------------
var root = process.env.ROOT_FOLDER;
var http_test_utils = require(path.join(root, '/test/server/utils/http'));

describe('HTTP tests:', function () {
    var app = null;
    var sandbox = null;
    var base_address = 'http://127.0.0.1:' + process.env.PORT;

    before(function (done) {
        // Initialize Express app and start server in test mode
        http_test_utils.initialize_app(function (new_app) {
            app = new_app;
            done();
        });
    });

    beforeEach(function () {
        // Create sandbox
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
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

    describe('Error handler', function () {
        it('should serve 404 error', function (done) {
            var url = '/not_exist';
            http_test_utils.simple_get(base_address, url, function (err, res, body) {
                res.statusCode.should.be.equal(404);
                body.should.be.equal('<h1>Oops something went wrong</h1><br/><span>404</span><div id="error-message-box"><div id="error-stack-trace"><pre><code>404: page not found</code></pre></div></div>');
                done();
            });

        });

        it('should serve 500 error', function (done) {

            app.get('/internal_error', function (req, res, next) {
                return next(new Error("This is an error!"));
            });

            var url = '/internal_error';
            http_test_utils.simple_get(base_address, url, function (err, res, body) {
                res.statusCode.should.be.equal(500);
                body.should.be.equal('<h1>Internal server error!</h1><br/><span>500</span><div id="error-message-box"><div id="error-stack-trace"><pre><code>Error: This is an error!</code></pre></div></div>');
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


