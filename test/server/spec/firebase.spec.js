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

describe('Firebase tests:', function () {
    var app = null;
    var firebaseRootRef = null;
    var sandbox = null;
    var base_address = 'http://127.0.0.1:' + process.env.PORT;

    before(function (done) {
        // Initialize Express app and start server in test mode
        http_test_utils.initialize_app(function (new_app, new_firebaseRootRef) {
            app = new_app;
            firebaseRootRef = new_firebaseRootRef;
            done();
        });
    });

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('firebase API', function () {
        it ('GET /api/v1/firebase should push data', function (done) {
            var self = this;
            sandbox.stub(firebaseRootRef, 'child', function (childPath) {
                self.childPath = childPath;
                return {
                    push: function (opts) {
                        self.opts = opts;
                    }
                }
            });
            var url = '/api/v1/firebase';
            http_test_utils.simple_get(base_address, url, function (err, res) {
                self.childPath.should.be.equal('test');
                self.opts.should.be.eql({num: 1,text: 'yay1!'});
                done();
            });
        })
    });

    after(function (done) {
        app.server.close(function () {
            done();
        });
    });
});
