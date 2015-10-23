import React from 'react';
import PublicationStore from '../stores/publicationStore';
import PublicationActions from '../actions/publicationActions';

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
                <h2>Publications</h2>
                <div>{this.state.publications}</div>
            </div>
        );
    }
}

export default Publications;