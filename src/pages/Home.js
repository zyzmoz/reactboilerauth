import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Message, Button, Label } from 'semantic-ui-react';
import withAuthorization from '../components/withAuthorization';
import { db } from '../firebase';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});



class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      click: 0,
      users: null
    }
  }

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot => {
      onSetUsers(snapshot.val());
      //this.setState(byPropKey('users', snapshot.val()));
    });
  }

  sum(a, b) {
    return a + b;
  }


  render() {
    let msg = "";
    if (this.state.click > 0)
      msg = "Click count: " + this.state.click;
    const { users } = this.props;

    return (

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
        <Button primary onClick={() => this.setState({ click: this.state.click + 1 })}>Click</Button>



      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>
    {Object.keys(users).map(key =>
      <div key={key}>
        {users[key].username}
      </div>
    )

    }
  </div>

const mapStateToProps = (state) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users })
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps))(HomePage);
