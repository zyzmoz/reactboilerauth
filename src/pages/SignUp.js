import React, { Component } from 'react';
import * as routes  from '../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';

//After implements it with redux

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

const SignUpPage = ({history}) =>
    <div>
        <h1>Sign Up Page</h1>
        <SignUpForm history={history} />
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

    
    onSubmit = (event) => {
        console.log(this.state);
        
        const {
            username,
            email,
            passwordOne
        } = this.state;

        const {
            history
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email,passwordOne)
            .then(authUser => {
                //Create User in Firebase database
                db.doCreateUser(authUser.uid, username, email)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_STATE }));
                        history.push(routes.HOME);
                    })
                    .catch(error => this.setState(byPropKey('error',error)));
                
            })
            .catch(error => this.setState(byPropKey('error', error)));
        event.preventDefault();
        
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

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink
}