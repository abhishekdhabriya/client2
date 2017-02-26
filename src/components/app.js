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
                <Header/>
            </div>
        );
    }
}
export default AppContainer;
