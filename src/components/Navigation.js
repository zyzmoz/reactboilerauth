import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import { Menu, Item} from 'semantic-ui-react';

const Navigation = ({ authUser }) =>
  <div>
    {authUser ?
      <NavigationAuth /> :
      <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <Menu>    
    <Item><Link to={routes.LANDING}>Landing</Link></Item>    
    <Item><Link to={routes.HOME}>Home</Link></Item>
    <Item><Link to={routes.ACCOUNT}>Account</Link></Item>
    <Menu.Menu position="right">
      <SignOutButton />
    </Menu.Menu>
  </Menu>
const NavigationNonAuth = () =>
  <Menu>
    <Item><Link to={routes.SIGN_IN}>Sign In</Link></Item>
    <Item><Link to={routes.LANDING}>Landing</Link></Item>
  </Menu>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
})

export default connect(mapStateToProps)(Navigation);
