import React, { Component } from 'react';
import { GlobalStore } from '../../services/GlobalStore'

class UserInfo extends Component {

  componentWillUnmount() {
    this.keyCloakListener.unsubscribe();
  }

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: ""
    };
    this.keyCloakListener = GlobalStore.subscribe('keycloak', keycloak => {
      if (keycloak) {
        keycloak.loadUserInfo().then(userInfo =>
          this.setState({ name: userInfo.name, email: userInfo.email, id: userInfo.sub }));
      }
    }, true);
  }

  render() {
    return (
      <div className="UserInfo">
        <p>{this.state.name}</p>
        <p>{this.state.email}</p>
      </div>
    );
  }
}
export default UserInfo;