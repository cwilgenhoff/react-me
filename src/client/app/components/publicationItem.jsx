import React from 'react';

class PublicationItem extends React.Component {

    constructor(){
        super();
    }

    render() {
        return (
            <div className='well publication'>
                <div className='details'>
                    <div>
                        <span className='field-label'>TITLE</span>
                        <p className='title'>{this.props.publication.title}</p>
                    </div>
                    <div>
                        <span className='field-label'>SUMMARY</span>
                        <p className='summary'>{this.props.publication.summary}</p>
                    </div>
                </div>
                <div className='cover-image-container'>
                    <img src={this.props.publication.cover.url} className='cover-image'/>
                </div>
            </div>
        );
    }

}

PublicationItem.propTypes = {
    publication: React.PropTypes.object
}

export default PublicationItem;
