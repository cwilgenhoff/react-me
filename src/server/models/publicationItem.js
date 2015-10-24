function publicationItem(app) {

    var PublicationItem = {
        getAll: getAll
    };

    return PublicationItem;

    function getAll(callback) {
        app.globals.dataLayer.getAllRows(callback);
    }
}

exports = module.exports = publicationItem;