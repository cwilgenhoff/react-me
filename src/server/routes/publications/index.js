function publications(app) {

    var PublicationItem = require('../../models/publicationItem')(app);

    app.globals.server.get('/api/publications/', getPublications);

    function getPublications(req, res, next) {
        PublicationItem.getAll(function (error, publications) {
            if (error) {
                console.log('error', error);
                return;
            }

            res.send(publications);
        });
    }
}

exports = module.exports = publications;
