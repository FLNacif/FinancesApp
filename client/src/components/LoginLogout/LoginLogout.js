import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { GlobalStore } from '../../services/GlobalStore';

class LoginLogout extends Component {


    constructor() {
        super()
        this.state = { authenticated: GlobalStore.lookAt('keycloak')?.authenticated };
    }

    componentWillUnmount() {
        this.keycloakListener.unsubscribe();
    }

    componentDidMount() {
        this.keycloakListener = GlobalStore.subscribe('keycloak', (keycloak) => {
            this.setState({ authenticated: keycloak?.authenticated })
        });
    }

    logout() {
        this.props.history.push('/')
        GlobalStore.publish('keycloak', GlobalStore.lookAt('keycloak')?.logout());
    }

    login() {
        this.props.history.push('/login')
    }

    render() {
        if (!(GlobalStore.lookAt('keycloak')?.authenticated)) {
            return (
                <button onClick={() => this.login()}>
                    Login
                </button>
            )
        } else {
            return (
                <button onClick={() => this.logout()}>
                    Logout
                </button>
            )
        }
    }
}
export default withRouter(LoginLogout);