import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login';
import { GlobalStore } from './services/GlobalStore';
import Menu from './components/Menu/Menu';
import { Stack } from 'office-ui-fabric-react';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    GlobalStore.lookAt('keycloak')?.authenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

export class App extends Component {

  componentWillUnmount() {
    this.keycloakListener.unsubscribe();
  }

  componentDidMount() {
    this.keycloakListener = GlobalStore.subscribe('keycloak', (keycloak) => {
      this.setState({ authenticated: keycloak?.authenticated })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Stack className="app-container">
          <Menu></Menu>
          <PrivateRoute path="/home" component={Home} />
          <Route path="/login" component={Login} />
          </Stack>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
