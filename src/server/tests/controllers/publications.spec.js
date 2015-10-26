'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var path = require('path');
var sinon = require('sinon');

var serverPath = '../../../server';

var mockApp = require(path.join(__dirname, serverPath, 'tests/mocks/app'));

mockApp.globals.models.PublicationItem = require(path.join(__dirname, serverPath, 'models/publicationItem'))(mockApp);

var sinonSandBox;
var publicationsController;
var registerEndpointStub;

describe('Publications Controller', function () {

    beforeEach(function() {
        sinonSandBox = sinon.sandbox.create();
        registerEndpointStub = sinonSandBox.stub(mockApp, 'registerEndpoint');
        publicationsController = require(path.join(__dirname, serverPath, 'controllers/publications'))(mockApp);
    });

    afterEach(function() {
        sinonSandBox.restore();
    });

    it('should expose a GET /api/publications endpoint', function() {
        //assert
        registerEndpointStub.calledOnce.should.equal(true);
        registerEndpointStub.calledWithMatch('get', '/api/publications/').should.equal(true);
    });

    it('should get zero publication items', function() {
        //prepare
        var publicationItemModelGetAllStub = sinonSandBox.stub(mockApp.globals.models.PublicationItem, 'getAll');
        var req = {};
        var res = {
            send: function(publications) {
                //assert
                publicationItemModelGetAllStub.calledOnce.should.equal(true);
                publications.should.have.length(0);
            }
        };
        publicationItemModelGetAllStub.callsArgWith(0, null, []);
        //act
        publicationsController.getPublications(req, res);
    });

    it('should get one publication item', function() {
        //prepare
        var publicationItemModelGetAllStub = sinonSandBox.stub(mockApp.globals.models.PublicationItem, 'getAll');
        var req = {};
        var res = {
            send: function(publications) {
                //assert
                publicationItemModelGetAllStub.calledOnce.should.equal(true);
                publications.should.have.length(1);
                publications[0].should.have.property('title').with.equal('title');
                publications[0].should.have.property('summary').with.equal('summary');
                publications[0].should.have.property('cover').with.property('url').with.equal('url');
            }
        };
        var publication = {title: 'title', summary: 'summary', cover: {url: 'url'}};
        publicationItemModelGetAllStub.callsArgWith(0, null, [publication]);
        //act
        publicationsController.getPublications(req, res);
    });

    it('should get two publication items', function() {
        //prepare
        var publicationItemModelGetAllStub = sinonSandBox.stub(mockApp.globals.models.PublicationItem, 'getAll');
        var req = {};
        var res = {
            send: function(publications) {
                //assert
                publicationItemModelGetAllStub.calledOnce.should.equal(true);
                publications.should.have.length(2);
            }
        };
        var publication = {title: 'title', summary: 'summary', cover: {url: 'url'}};
        publicationItemModelGetAllStub.callsArgWith(0, null, [publication, publication]);
        //act
        publicationsController.getPublications(req, res);
    });
});