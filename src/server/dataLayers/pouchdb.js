function pouchdb(app) {
    var PouchDB = require('pouchdb');
    var db;

    var dataLayer = {
        getDatabase: getDatabase
    };

    return dataLayer;

    function getDatabase(callback) {
        if (!db) {
            db = new PouchDB(app.globals.config.dataLayer.pouchdb.dbName);
            syncDatabase(callback);
        }
        return db;
    }

    function syncDatabase(callback) {
        var remoteCouch = getConnectionString(app.globals.config.dataLayer.pouchdb.remote);
        var options = app.globals.config.dataLayer.pouchdb.options;

        db.sync(remoteCouch, options)
            .on('complete', function (info) {
                callback(null, info);
            }).on('error', function (err) {
                callback(err);
            });
    }

    function getConnectionString(remoteConfig) {
        var auth = '';
        if (remoteConfig.username && remoteConfig.password) {
            auth = remoteConfig.username + ':' + remoteConfig.password + '@';
        }

        return remoteConfig.protocol + '://' +
            auth +
            remoteConfig.url + '/' +
            remoteConfig.dbName;
    }
}

exports = module.exports = pouchdb;