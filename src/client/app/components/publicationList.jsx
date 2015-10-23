import React from 'react';
import PublicationItem from '../components/publicationItem.jsx';

class PublicationList extends React.Component {

    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <div className='publications'>
                    { this.props.publications.map(publication => <PublicationItem key={publication.key} publication={publication.doc}/>) }
                </div>
            </div>
        );
    }

}

PublicationList.propTypes = {
    publications : React.PropTypes.array
}

export default PublicationList;