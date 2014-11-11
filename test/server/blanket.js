var path = require('path');
var _ = require('lodash');

process.env.rootFolder = path.join(__dirname, '..', '..');
process.env.MC_ENV = process.env.NODE_ENV || 'test';

// Suppress
// (node) warning: possible EventEmitter memory leak detected. 11 listeners added.
// Use emitter.setMaxListeners() to increase limit
process.setMaxListeners(0);

require('blanket')({
    // Only files that match the pattern will be instrumented
    pattern: _.map(['/app', '/config'], function (path) { return process.env.rootFolder + path; })
});
