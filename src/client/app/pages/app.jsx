import React from 'react';
import { RouteHandler } from 'react-router';

class App extends React.Component {

    render() {
        return (
            <div>
                <h1>React-Me</h1>
                <div className="content">
                    <RouteHandler/>
                </div>
            </div>
        );
    }

}

export default App;
