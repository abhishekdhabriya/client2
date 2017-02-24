import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authenticationAction from '../../actions/AuthenticationAction';



class Header extends Component {
    constructor(props) {
        super(props);

        // this.state = { loggedIn: false }; // the state over here is the component state and not the redux state. 
    }

    render() {
        return (
            <div>
                <h2>LoggedInStatus: {this.props.loggedIn ? 'user' : 'not logged in'}</h2>
                <button onClick = {() => this.props.actions.initiateLogin(true)}>Login</button>
            </div>
        );
    }
}

// This takes in our applicaton state(managed by redux) and maps it to props.
// Whenever application state changes (like ajax data load) the container will automatically re-render.
function mapStateToProps(state) {
    // we return an object here and this  object will show up as props inside the render function (this.props.loggedIn)
    return {
        loggedIn: state.authenticate
        // the key loggedIn refers to the loggedIn property in the props and the state.loggedIn referes to state maintained in reducer.
    };
}

// map dispatch to props, binds the actions we expose in the container component to the reducers.
// we return an object from this function which gets available on the props of this container. 
// dispatch is a function which takes all the actions being invoked and funnel them trhough all the reducers.
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authenticationAction, dispatch)
        // by above we have associated all actions under authenticationAction file with a key action and now 
        // all of them are available from this.props.action.
        // whenever any action is called, all the results are passed to all our reducers
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);