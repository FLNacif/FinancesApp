import React, { Component } from 'react';
import { GlobalStore } from '../../services/GlobalStore';
import Keycloak from 'keycloak-js'
import { Redirect } from 'react-router-dom';

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = { authenticated: GlobalStore.lookAt('keycloak')?.authenticated };
        if (this.props.location?.state != null) {
            localStorage['lastRouteLogin'] = JSON.stringify(this.props.location.state.from);
        }

    }

    componentWillUnmount() {
        this.keycloakListener.unsubscribe();
        localStorage.removeItem('lastRouteLogin')
    }

    componentDidMount() {
        this.keycloakListener = GlobalStore.subscribe('keycloak', (keycloak) => {
            this.setState({ authenticated: keycloak?.authenticated })
        });

        if (!(GlobalStore.lookAt('keycloak')?.authenticated)) {
            const keycloak = Keycloak('keycloak.json');

            keycloak.init({ onLoad: 'login-required', promiseType: 'native' }).then(authenticated => {
                GlobalStore.publish('keycloak', keycloak)
            })
        }
    }

    render() {
        let from = { pathname: '/' }
        if (localStorage['lastRouteLogin']) {
            from = JSON.parse(localStorage['lastRouteLogin']);
        }
        if (this.state.authenticated) {
            return (<Redirect to={from}></Redirect>);
        }
        return null;
    }
}