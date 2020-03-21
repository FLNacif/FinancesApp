import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login';
import { GlobalStore } from './services/GlobalStore';
import LoginLogout from './components/LoginLogout/LoginLogout';

export class App extends Component{

  constructor(){
    super()
    // this.setState({authenticated: GlobalStore.lookAt('keycloak')?.authenticated});
  }

  componentWillUnmount(){
    this.keycloakListener.unsubscribe();
  }

  componentDidMount(){
    this.keycloakListener = GlobalStore.subscribe('keycloak', (keycloak) =>{
      this.setState({authenticated: keycloak?.authenticated})
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><LoginLogout></LoginLogout></li>
          </ul>
          {/* <Home></Home> */}
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
