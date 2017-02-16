import "./client.scss";
import ReactDOM from 'react-dom';
import React from 'react';
import AppContainer from './components/app';

 ReactDOM.render(<AppContainer />, document.getElementById('mount'));

// this code gets turned into a dead code with production build as uglify will delete it.
if(module.hot){
    module.hot.accept((err) => {
        console.log(err);
    });
}

