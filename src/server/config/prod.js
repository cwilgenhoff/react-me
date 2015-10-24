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
                protocol: 'http',
                url: 'padify.cloudant.com',
                username: 'asemeacherbsepteditheres',
                password: '81f0885385265026485780696c1f95f9eb529833'
            },
            options: {
                /* CORS is disabled in remote CouchDB */
                /* live: true  */
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
