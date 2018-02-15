import React, { Component } from 'react';
import * as routes  from '../constants/routes';
import { Link } from 'react-router-dom';

//After implements it with redux

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

const SignUpPage = () =>
    <div>
        <h1>Sign Up Page</h1>
        <SignUpForm />
    </div>

//Set props tool
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit(event) {
        //To-do
    }

    render(){
        //This will provide values locally
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        //Validation
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return(
            <form onSubmit={this.onSubmit}>
                <input
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="e-Mail"
                />
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />

                <button 
                    type="submit"
                    disabled={isInvalid}>
                    Sign Up
                </button>


                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () =>
    <p>
        Don't have an Account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default SignUpPage;

export {
    SignUpForm,
    SignUpLink
}