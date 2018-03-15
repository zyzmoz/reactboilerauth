import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import * as routes from '../constants/routes';
import { Button } from 'semantic-ui-react';
import checked from '../assets/img/checked.png';
import envelope from '../assets/img/envelope.png';
import { auth } from '../firebase';


class VerifyAccount  extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      isVerified: false
    }   
      
  }

  componentDidMount() {    
    this.setState({ email: firebase.auth().currentUser.email, isVerified: firebase.auth().currentUser.emailVerified });
        
  }  

  verify = () => {

    firebase.auth().currentUser.reload().then(() => {
      this.setState({ email: firebase.auth().currentUser.email, isVerified: firebase.auth().currentUser.emailVerified });    
    });      
    
      
    
    
    
  }

  resendVerification = () => {
    firebase.auth().currentUser.sendEmailVerification();
  }

  isVerified = (email) => {
    
    const {
      history
    } = this.props;

    if (this.state.isVerified) {                 
      
      return ( 
      <div className="padding text-center">
          <img src={checked} alt="checked"/>
        <h1>User already verified!</h1>        
        <Button className="button" onClick={() => { auth.doSignOut(); history.push(routes.SIGN_IN)}} primary>Sign In</Button>
      </div>)
    } else if (this.state.email) {
      return (
      <div className="padding text-center">
        <img src={envelope} alt="envelope"/>
        <h1>A verification e-mail was sent to:</h1>
        <h2>{email}</h2>
        <Button onClick={() => this.resendVerification()}>Resend e-mail Verification</Button>
        <Button primary onClick={() => this.verify()}>Verify and Click Here to Login</Button>
        
      </div>)
    }
  }

  render(){  
    
    const { email } = this.state;
    console.log(this.state);    
    const msg = this.isVerified(email);
    return (
      <div>
        {msg}
      </div>
    )
  }

}

export default withRouter(VerifyAccount);