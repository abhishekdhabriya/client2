import React, { Component } from 'react';
import Header from './containers/Header';
// import './app.scss';

class AppContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <h1>THis is app home !</h1>
                
            </div>
        );
    }
}
export default AppContainer;
