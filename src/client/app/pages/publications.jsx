import React from 'react';
import PublicationStore from '../stores/publicationStore';
import PublicationActions from '../actions/publicationActions';
import PublicationList from '../components/publicationList.jsx';

class Publications extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            publications : []
        };
    }

    componentDidMount() {
        this.unsubscribe = PublicationStore.listen(this.onStatusChange.bind(this));
        PublicationActions.loadPublications();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <div>
                <h3>Publications</h3>
                <PublicationList publications={this.state.publications} />
            </div>
        );
    }
}

export default Publications;