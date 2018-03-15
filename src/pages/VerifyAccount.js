import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import * as routes from '../constants/routes';
import { Button } from 'semantic-ui-react';


class VerifyAccount  extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: ''
    }   
      
  }

  componentDidMount() {
    if (firebase.auth().currentUser) 
      this.setState({ email: firebase.auth().currentUser.email, isVerified: firebase.auth().currentUser.emailVerified});
    
  }

  isVerified = (email) => {
    
    const {
      history
    } = this.props;

    if (this.state.isVerified) {           
      
      return ( 
      <div className="padding text-center">
        <h1>User already verified!</h1>        
      </div>)
    } else {
      return (
      <div className="padding text-center">
        <h1>A verification e-mail was sent to:</h1>
        <h2>{email}</h2>
        <Button primary onClick={() => history.push(routes.SIGN_IN)}>Verify and Click Here to Login</Button>
        
      </div>)
    }
  }

  render(){  
    
    const { email } = this.state;
    const msg = this.isVerified(email);
    return (
      <div>
        {msg}
      </div>
    )
  }

}

export default withRouter(VerifyAccount);