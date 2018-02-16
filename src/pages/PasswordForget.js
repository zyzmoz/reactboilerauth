import React, { Component } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { Form, Message, FormInput, FormButton } from 'semantic-ui-react';

const PasswordForgetPage = () =>
  <div className="middle-form">
    <h1>Forget Password Page</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: '',
  error: null,
  success: false
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        setTimeout(() => {
          this.setState(byPropKey('success', true));
        },5000);
        
      })
      .catch(error => this.setState(byPropKey('error', error)));

    this.setState(() => ({ ...INITIAL_STATE }));
    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
      success
    } = this.state;

    const isInvalid =
      email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <FormInput
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />

        {error && <Message color="red">{error.message}</Message>}
        {success && successMessage()}

        <FormButton
          color="red"
          disabled={isInvalid}
          type="submit">
          Reset My Password              
        </FormButton>
        
      </Form>
    )
  }
}

const successMessage = () =>
  <Message color="green">A Reset link was sent to your registration Email!</Message>

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>



export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink
}