import './app.scss';

import React, { Component } from 'react';

class AppContainer extends Component {

    constructor(props) {
        super(props);

        this._click = this._click.bind(this);

    }

    componentDidMount() {
        console.log('HEY you!');
    }

    render() {
        return (
            <div>
                <h1>Hey webpack 2 -- HMR Rocks! </h1>
                <button onClick={this._click}>Click again </button>
            </div>
        );
    }

    _click() {
        console.log('this will');
    }
}
export default AppContainer;
