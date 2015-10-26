import React from 'react/addons';
import chai, {expect} from 'chai';

var should = chai.should();

import PublicationItem from '../../app/components/publicationItem.jsx';

var TestUtils = React.addons.TestUtils;

describe('PublicationItem', function() {

    var publicationItem;
    var publicationMock;

    before('setup', function() {
        publicationMock = {
            title: 'title',
            summary: 'summary',
            cover: {
                url: 'url'
            }
        };

        publicationItem = TestUtils.renderIntoDocument(<PublicationItem publication={ publicationMock } />);
    });

    it('renders', function() {
        var foundPublicationDivWrapper = TestUtils.findRenderedDOMComponentWithClass(publicationItem, 'publication');
        should.exist(foundPublicationDivWrapper);
    });

    it('should display a title, a summary and a cover image', function() {
        var publicationTitle = TestUtils.findRenderedDOMComponentWithClass(publicationItem, 'title');
        var publicationSummary = TestUtils.findRenderedDOMComponentWithClass(publicationItem, 'summary');
        var publicationCoverImage = TestUtils.findRenderedDOMComponentWithClass(publicationItem, 'cover-image');
        //assert
        publicationTitle.getDOMNode().textContent.should.equal(publicationMock.title);
        publicationSummary.getDOMNode().textContent.should.equal(publicationMock.summary);
        publicationCoverImage.getDOMNode().src.should.equal(publicationMock.cover.url);
    });
});
