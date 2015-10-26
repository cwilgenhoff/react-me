/*jslint node: true */
'use strict';

function PublicationsController(app) {

    var PublicationItem = app.globals.models.PublicationItem;

    var Controller = {
        getPublications: getPublications
    };

    init();

    return Controller;

    function init() {
        app.registerEndpoint('get', '/api/publications/', Controller.getPublications);
    }

    function getPublications(req, res) {
        PublicationItem.getAll(function (error, publications) {
            if (error) {
                console.log('error', error);
                return;
            }

            res.send(publications);
        });
    }
}

exports = module.exports = PublicationsController;
