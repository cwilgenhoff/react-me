/*jslint node: true */
'use strict';

function config() {
    var config = {};

    config.appPort = process.env.PORT || 7200;

    config.dataLayer = {
        use: 'pouchdb',
        pouchdb: {
            dbName: 'test-collection-prod',
            remote: {
                dbName: 'test-collection',
                protocol: 'https',
                url: 'wiljs.cloudant.com',
                username: 'iaticaskedntlenitimanden',
                password: 'b538fcb2bab5d891a35129eb26196094169564ce'
            },
            options: {
                live: true
            }
        }
    };

    config.cors = {
        origin: '*',
        allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'Origin'],
        methods: ['GET', 'PUT', 'POST', 'HEAD', 'DELETE'],
        credentials: true
    };

    return config;
}

exports = module.exports = config;
