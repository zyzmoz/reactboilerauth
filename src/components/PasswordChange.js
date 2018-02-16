import React, { Component } from 'react';
import { auth } from '../firebase';

const byPropsKey = (propertyName, value) =>({
    [propertyName]: value
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class PasswordChangeForm extends Component {
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            passwordOne            
        } = this.state;
        
        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
            })
            .catch(error => this.setState(byPropsKey('error', error)));

        event.preventDefault();
    }

    render(){
        const {
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid =
            passwordOne === '' ||
            passwordOne !== passwordTwo;
        
        return(
            <form onSubmit={this.onSubmit}>
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropsKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="New Password"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropsKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm New Password"
                />

                <button
                    disabled={isInvalid}
                    type="submit">
                    Reset my Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }    
}

export default PasswordChangeForm
