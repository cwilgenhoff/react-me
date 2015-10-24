module.exports = function(app) {
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
        //TODO: Handle errors
        db.sync(
            getConnectionString(app.globals.config.dataLayer.pouchdb.remote),
            app.globals.config.dataLayer.pouchdb.options,
            callback);
    }

    function getConnectionString(remoteConfig) {
        return remoteConfig.protocol + '://' +
            remoteConfig.username + ':' +
            remoteConfig.password + '@' +
            remoteConfig.url + '/' +
            remoteConfig.collection;
    }
};
