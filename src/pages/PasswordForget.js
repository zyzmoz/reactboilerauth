import React, { Component } from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { Form, Message, FormInput, FormButton } from 'semantic-ui-react';

const PasswordForgetPage = () =>
  <div>
    <h1>Forget Password Page</h1>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: '',
  error: null
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.props;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => this.setState(byPropKey('error', error)));

    event.preventDefault();
  }

  render() {
    const {
      email,
      error
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

        <FormButton
          color="red"
          disabled={isInvalid}
          type="submit">
          Reset My Password
                </FormButton>

        {error && <Message>{error.message}</Message>}
      </Form>
    )
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>



export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink
}