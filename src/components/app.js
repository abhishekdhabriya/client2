import React, { Component } from 'react';
import './app.scss';
import Header from './containers/Header';
class AppContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hey webpack 2</h1>
                <Header/>
            </div>
        );
    }
}
export default AppContainer;
