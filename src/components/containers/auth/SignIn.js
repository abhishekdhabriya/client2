import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SignIn extends Component {


    // function we want handleSubmit(from redux-form) to call with our finalize form properties.
    handleFormSubmit({email, password}) {
        console.log(email, password);
    }

    render() {

        // handle submit is a helper from the redux-form.
        const {handleSubmit} = this.props;
        console.log(this.props);

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className='form-group'>
                    <label>Email:</label>
                    <Field name="email" component="input" type="text" placeholder="Email"/>
                </fieldset>
                <fieldset className='form-group'>
                    <label>Password:</label>
                    <Field name="password" component="input" type="text" placeholder="password"/>
                </fieldset>
                <button type='submit' className='btn btn-primary'>Sign In</button>
            </form>
        );
    }
}

// redux form is a higher order component such as redux connect and provides us the fields on the this.props object.
// like this.props.field.email
export default reduxForm({
    form: 'signin' // actual name of the form 
})(SignIn);