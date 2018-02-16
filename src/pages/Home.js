import React, { Component } from 'react';
import { Message, Button, Label } from 'semantic-ui-react';
import withAuthorization from '../components/withAuthorization';
import { db } from '../firebase';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});



class HomePage extends Component {
  constructor(){
    super();
    this.state = {
      click: 0,
      users: null
    }
  }

  componentDidMount(){
    db.onceGetUsers().then(snapshot => {
      console.log(snapshot);
      
      this.setState(byPropKey('users', snapshot.val())); 
    });
  }

  sum(a, b){
    return a + b;
  }


  render(){
    let msg = "";
    if (this.state.click > 0)
      msg = "Click count: " + this.state.click;
    const { users } = this.state;

    return(
      
      <div className="padding">
      <Message>
        <Message.Header>
          Hello
          {!!users && <UserList users={users} />}
        </Message.Header>
        <p>
          Clicks: {this.state.click}
        </p>
      </Message>
      <Button primary onClick={() => this.setState({click: this.state.click + 1})}>Click</Button>

      

      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>
    {Object.keys(users).map( key =>
      <div key={key}>
        {users[key].username}
      </div>
    )  

    }
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
