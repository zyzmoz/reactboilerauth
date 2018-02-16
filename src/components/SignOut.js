import React from 'react';
import { auth } from '../firebase';
import { Button } from 'semantic-ui-react';

const SignOutButton = () =>
  <Button 
    color="teal"
    type="button"
    onClick={auth.doSignOut}>
    Sign Out
    </Button>
export default SignOutButton;
