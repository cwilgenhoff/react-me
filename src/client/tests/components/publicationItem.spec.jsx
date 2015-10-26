import React from 'react/addons';
import chai, {expect} from 'chai';

var should = chai.should();

import PublicationItem from '../../app/components/publicationItem.jsx';

var TestUtils = React.addons.TestUtils;

describe('PublicationItem', function() {

    var publicationItem;

    before('setup', function() {
        var publicationMock = {
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
});