var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    port: process.env.PORT || 3000,
    root: rootPath,
    //------------------------------
    // Firebase Endpoints
    //------------------------------
    firebase: {
        url: 'https://value.firebaseio.com/'
    }
};