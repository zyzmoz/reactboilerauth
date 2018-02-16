import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from '../components/PasswordChange';

import withAuthorization from '../components/withAuthorization';



const AccountPage = ({ authUser }) =>
  <div className="middle-form">
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <br/>
    <PasswordChangeForm />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
})

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);