import {INITIATE_LOGIN} from './actionTypes';

// initiateLogin is an ActionCreator, it needs to return an action.
// an action is an object which has a type (type of action)and a payload property
export function initiateLogin(credentials) {
  return {
      type: INITIATE_LOGIN,
      payload: credentials // make an ajax call here and return that as a state to reducer
  };
}