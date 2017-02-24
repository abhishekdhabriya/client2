import {combineReducers} from 'redux';
import AuthenticationReducer from './AuthenticationReducer';

// combineReducers tells redux on how to create our application state.
const rootReducer = combineReducers({
    // mapping of state ro rootReducer
    // the key is part of the global application state and value is the reducer responsible for providing the new state.
    authenticate: AuthenticationReducer
});

export default rootReducer;
