import React from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../components/withAuthorization';

const AdminPage = (props, { authUser }) =>
  <div>
    <h1>Admin</h1>
    <p>Restricted area! Only users with the admin rule are authorized.</p>
  </div>

AdminPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';

export default withAuthorization(authCondition)(AdminPage);