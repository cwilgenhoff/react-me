/*jshint node:true*/
'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var app = {};

app.globals = {
    utils: {},
    config: {}
};

app.globals.utils.fs = fs;
app.globals.utils.path = path;
app.globals.config = require(app.globals.utils.path.join(__dirname, 'config', 'main'))(app);

app.loadDataLayer = function(app) {
    app.globals.dataLayer = require(app.globals.utils.path.join(__dirname, 'dataLayers', app.globals.config.dataLayer.use))(app);
    app.globals.db = app.globals.dataLayer.getDatabase(function(error) {
        if (error) {
            console.log('DataLayer DB Failed to Load');
            console.log(error);
            return;
        }

        console.log('DataLayer DB Successfully Loaded');
    });
};

app.loadRoutes = function(app) {
    var routesPath = app.globals.utils.path.join(__dirname, 'routes/');
    fs.readdir(routesPath, function (err, routes) {
        if (err) {
            throw err;
        }

        routes.forEach( function (route) {
            require(routesPath + route)(app.globals.server);
        });
    });
};

app.run = function() {
    app.globals.server = express();
    app.globals.server.use(bodyParser.urlencoded({extended: true}));
    app.globals.server.use(bodyParser.json());
    app.globals.server.use(compress());
    app.globals.server.use('/', express.static('./public'));

    app.loadDataLayer(app);
    app.loadRoutes(app);

    app.globals.server.listen(app.globals.config.appPort, function() {
        console.log('Express server listening on port ' + app.globals.config.appPort);
    });
};

exports = module.exports = app;