function publications(app) {
    app.globals.server.get('/api/publications/', getPublications);

    function getPublications(req, res, next) {
        app.globals.db.allDocs({include_docs:true}).then(function (publications) {
            res.send(publications.rows);
        });
    }
}

exports = module.exports = publications;