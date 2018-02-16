import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { Form, Message, FormInput, FormButton } from 'semantic-ui-react';

const SignInPage = ({ history }) =>
  <div className="middle-form">
    <h1>Sign In Page </h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null


};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password
    } = this.state;

    const {
      history
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => this.setState(byPropKey('error', error)));

    event.preventDefault();
  }


  render() {
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <FormInput
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email"
        />
        <FormInput
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />

        {error && <Message color="red">{error.message}</Message >}

        <FormButton primary
          disabled={isInvalid}
          type="submit">
          Sign In
                </FormButton>
        
      </Form>
    )


  }
}


export default withRouter(SignInPage);

export {
  SignInForm
}