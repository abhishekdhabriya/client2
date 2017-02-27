import "./index.scss";
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import AppContainer from './components/app';
import SignInContainer from './components/containers/auth/SignIn';
import reducers from './reducers'; // if reducers is a folder then by default it will look for index.js file
import { BrowserRouter, Route } from 'react-router-dom';
import { install as offlineInstall } from 'offline-plugin/runtime';



const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

// console.log($('.nav-item'));

ReactDOM.render(
    // Provider is a higher order component that attaches the redux store to our react container components.
    // Provider component accepts our store as a props and wraps our container component.    
    <Provider store={store}>
        <BrowserRouter>
        
            <div>
                <AppContainer/>
                {/*<Route exact path="/" component={AppContainer} />*/}
                <Route path="/signin" component={SignInContainer} />
            </div>

        </BrowserRouter>
    </Provider>
    , document.getElementById('mount'));
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

    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}

