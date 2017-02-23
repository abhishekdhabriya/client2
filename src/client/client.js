import "./client.scss";
import ReactDOM from 'react-dom';
import React from 'react';
import AppContainer from './components/app';
import { install as offlineInstall } from 'offline-plugin/runtime';

ReactDOM.render(<AppContainer />, document.getElementById('mount'));
// process.env.NODE_ENV is set in webpack configuration
// If built for production uglify will remove the if condition as it will relize that this code will always be true
// and in dev mode we don't care if we have this code. :)
if (process.env.NODE_ENV === 'production') {
    offlineInstall();
}

// this code gets turned into a dead code with production build as uglify will delete it.
if (module.hot) {
    module.hot.accept((err) => {
        console.log(err);
    });
}

