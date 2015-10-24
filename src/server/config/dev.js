/*jslint node: true */
'use strict';

function config() {
    var config = {};

    config.appPort = 7200;

    config.dataLayer = {
        use: 'pouchdb',
        pouchdb: {
            dbName: 'test-collection-dev',
            remote: {
                dbName: 'test-collection',
                protocol: 'http',
                url: 'localhost:5984',
                username: '',
                password: ''
            },
            options: {
                live: true
            }
        }
    };

    config.cors = {
        source: false
    };

    return config;
}

exports = module.exports = config;
