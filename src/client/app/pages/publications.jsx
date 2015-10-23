import React from 'react';

class Publications extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            publications : [],
            loading: false
        };
    }

    componentDidMount() {
        //this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
        //ItemActions.loadItems();
    }

    componentWillUnmount() {
        //this.unsubscribe();
    }

    onStatusChange(state) {
        //this.setState(state);
    }

    render() {

        return (
            <div>
                <h2>Publications</h2>
            </div>
        );
    }
}

export default Publications;