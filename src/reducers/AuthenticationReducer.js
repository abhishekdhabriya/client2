import {INITIATE_LOGIN} from '../actions/actionTypes';

// All reducers gets two parameters, state which this reducer is responsible for (not the whole application state) and an action.
// This reducer cannot change the state it doesn't manaage.
// default state is null, redux doesn't allow us to return undefined
// reducers returns the new state. 

export default function (state = null, action) {
    switch (action.type){
        case INITIATE_LOGIN :
            return action.payload;

        default: 
        return state;    
    }
}
