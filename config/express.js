/**
 * Module dependencies.
 */
var express = require('express.io'),
    winston = require('winston'),
    expressWinston = require('express-winston');

module.exports = function (app) {
    app.set('showStackError', true);

    //Should be placed before express.static
    app.use(express.compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
    app.use(express.favicon());
    //Set views path, template engine and default layout
    app.set('views', process.env.ROOT_FOLDER + '/app/views');
    app.set('view engine', 'jade');

    //Enable jsonp
    app.enable('jsonp callback');

    app.configure(function () {

        //bodyParser should be above methodOverride
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());

        app.use(function (req, res, next) {
            res.simpleJsonApiResponse = function (err, response) {
                if (err) {
                    return res.json(500, {message: 'No data received from the back end services!'});
                } else {
                    return res.json(response);
                }
            };
            next();
        });

        // express-winston logger makes sense BEFORE the router.
        app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console({
                    json: true,
                    colorize: true
                })
            ]
        }));

        app.use(app.router);

        // express-winston errorLogger makes sense AFTER the router.
        app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console({
                    json: true,
                    colorize: true
                }),
                new (winston.transports.File)({ filename: process.env.ROOT_FOLDER + '/logs/error.log' })
            ]
        }));

        // Handle 404
        app.use(function (req, res) {
            res.status(404);
            res.render('404.jade', {error: '404: page not found'});
        });

        // Handle 500
        app.use(function (error, req, res, next) {
            if (!error) next();
            var header = 'Internal server error!';
            res.status(500);
            res.render('500.jade', {error: error, header: header});
        });
    });
};
