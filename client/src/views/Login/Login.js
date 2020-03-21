import React, { Component } from 'react';
import { GlobalStore } from '../../services/GlobalStore';
import Keycloak from 'keycloak-js'
import { Redirect } from 'react-router-dom';

export class Login extends Component {

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

        if (!(GlobalStore.lookAt('keycloak')?.authenticated)) {
            const keycloak = Keycloak('keycloak.json');

            keycloak.init({ onLoad: 'login-required', promiseType: 'native' }).then(_ => {
                GlobalStore.publish('keycloak', keycloak)
            })
        }
    }

    render() {
        if (this.state.authenticated) {
            return (<Redirect to="/"></Redirect>);
        }
        return null;
    }
}