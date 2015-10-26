import React from 'react/addons';
import chai, {expect} from 'chai';

import rewire from 'rewire';
import RewireHelper from '../utils/rewireHelper';

var should = chai.should();

import PublicationList from '../../app/components/publicationList.jsx';

var TestUtils = React.addons.TestUtils;

describe('PublicationList', function() {

    var publicationList;
    var publicationMock;
    //var PublicationItem;

    before('setup', function() {
        publicationMock = {title: 'title', summary: 'summary', cover: {url: 'url'}};

        publicationList = TestUtils.renderIntoDocument(<PublicationList publications={ [] } />);

        //PublicationItem = rewire('../../app/components/publicationItem.jsx');

        // Replace the required module with a stub component.
        // RewireHelper.rewire(PublicationList, {
        //    PublicationItem: React.createClass({
        //        render: function() { return <div />; }
        //    })
        //});
    });

    it('renders', function() {
        var foundPublicationDivWrapper = TestUtils.findRenderedDOMComponentWithClass(publicationList, 'publications');
        should.exist(foundPublicationDivWrapper);
    });

    it('display zero items', function() {
        var foundPublicationDivWrapper = TestUtils.findRenderedDOMComponentWithClass(publicationList, 'publications');
        foundPublicationDivWrapper.props.children.length.should.equal(0);
    });

    it('display one item', function() {
        var publicationDoc = { key:'key1', doc: publicationMock};

        publicationList = TestUtils.renderIntoDocument(<PublicationList publications={ [publicationDoc] } />);
        var foundPublicationDivWrapper = TestUtils.findRenderedDOMComponentWithClass(publicationList, 'publications');
        //assert
        foundPublicationDivWrapper.props.children.length.should.equal(1);
    });

    it('display two items', function() {

        var publicationDocFirst = { key:'key1', doc: publicationMock};
        var publicationDocSecond = { key:'key2', doc: publicationMock};

        publicationList = TestUtils.renderIntoDocument(<PublicationList publications={ [publicationDocFirst, publicationDocSecond] } />);
        var foundPublicationDivWrapper = TestUtils.findRenderedDOMComponentWithClass(publicationList, 'publications');
        //assert
        foundPublicationDivWrapper.props.children.length.should.equal(2);
    });

    it('display three items', function() {
        var publicationDocFirst = { key:'key1', doc: publicationMock};
        var publicationDocSecond = { key:'key2', doc: publicationMock};
        var publicationDocThird = { key:'key3', doc: publicationMock};

        publicationList = TestUtils.renderIntoDocument(<PublicationList publications={ [publicationDocFirst, publicationDocSecond, publicationDocThird] } />);
        var foundPublicationDivWrapper = TestUtils.findRenderedDOMComponentWithClass(publicationList, 'publications');
        //assert
        foundPublicationDivWrapper.props.children.length.should.equal(3);
    });
});
