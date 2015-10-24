/*jslint node: true */
'use strict';

module.exports = function() {
    var config = {};

    config.appPort = process.env.PORT;

    config.dataLayer = {
        use: 'pouchdb',
        pouchdb: {
            dbName: 'prod-react-me-db',
            remote: {
                protocol: 'http',
                url: 'padify.cloudant.com',
                username: 'asemeacherbsepteditheres',
                password: '81f0885385265026485780696c1f95f9eb529833',
                collection: 'test-collection'
            },
            options: {
                live: true
            }
        }
    };

    return config;
};