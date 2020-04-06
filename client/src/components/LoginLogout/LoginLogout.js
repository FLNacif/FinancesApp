import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
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
                <span onClick={() => this.login()}>
                    Login
                </span>
            )
        } else {
            return (
                <span onClick={() => this.logout()}>
                    Logout
                </span>
            )
        }
    }
}
export default withRouter(LoginLogout);