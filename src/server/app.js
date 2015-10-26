/*jshint node:true*/
'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
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
    app.globals.db = app.globals.dataLayer.getDatabase(function(error, info) {
        if (error) {
            console.log('DataLayer DB Failed to Load');
            console.log(error);
            return;
        }

        console.log('DataLayer DB Successfully Loaded');
        console.log(info);
    });
};

app.loadControllers = function(app) {
    var controllersPath = app.globals.utils.path.join(__dirname, 'controllers/');
    fs.readdir(controllersPath, function (error, controllers) {
        if (error) {
            throw error;
        }

        controllers.forEach(function (controller) {
            require(controllersPath + controller)(app);
        });
    });
};

app.loadModels = function(app, callback) {
    app.globals.models = app.globals.models || {};

    var modelsPath = app.globals.utils.path.join(__dirname, 'models/');
    fs.readdir(modelsPath, function (error, models) {
        if (error) {
            callback(error);
        }

        models.forEach( function (fileName) {
            var model = require(modelsPath + fileName)(app);
            app.globals.models[model.name] = model;
        });

        callback(null);
    });
};

app.registerEndpoint = function(verb, url, callback) {
    if (!app.globals.server || !app.globals.server[verb]) {
        console.log('No verb + ' + verb + 'available.');
        return;
    }

    if (!url) {
        console.log('No url provided.');
        return;
    }

    var argumentsOptions = [url];

    if (callback && (callback instanceof Array)) {
        argumentsOptions = argumentsOptions.concat(callback);
    } else if (callback) {
        argumentsOptions.push(callback);
    }

    app.globals.server[verb].apply(app.globals.server, argumentsOptions);
};

app.run = function() {
    app.globals.server = express();
    app.globals.server.use(bodyParser.urlencoded({extended: true}));
    app.globals.server.use(bodyParser.json());
    app.globals.server.use(compress());
    app.globals.server.use(cors(app.globals.config.cors));
    app.globals.server.use('/', express.static('./public'));

    app.globals.server.listen(app.globals.config.appPort, function() {
        console.log('Express server listening on port ' + app.globals.config.appPort);

        app.loadModels(app, function (error) {
            if (error) {
                throw error;
            }

            app.loadControllers(app);
            app.loadDataLayer(app);
        });
    });
};

exports = module.exports = app;
