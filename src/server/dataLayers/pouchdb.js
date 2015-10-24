function pouchdb(app) {
    var PouchDB = require('pouchdb');
    var db;

    var dataLayer = {
        getDatabase: getDatabase,
        getAllRows: getAllRows
    };

    return dataLayer;

    function getDatabase(callback) {
        if (!db) {
            db = new PouchDB(app.globals.config.dataLayer.pouchdb.dbName);
            syncDatabase(callback);
        }
        return db;
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

    function syncDatabase(callback) {
        var remoteCouch = getConnectionString(app.globals.config.dataLayer.pouchdb.remote);
        var options = app.globals.config.dataLayer.pouchdb.options;

        db.sync(remoteCouch, options)
            .on('complete', function (info) {
                callback(null, info);
            }).on('error', function (error) {
                callback(error);
            });
    }

    function getAllRows(callback) {
        db.allDocs({include_docs:true})
            .then(function (items) {
                callback(null, items.rows);
            }).catch(function (error){
                callback(error);
            });
    }
}

exports = module.exports = pouchdb;