import React from 'react'
import UserInfo from '../UserInfo/UserInfo';
import LoginLogout from '../LoginLogout/LoginLogout';
import { GlobalStore } from '../../services/GlobalStore';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
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

    render() {
        return (
            <>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><LoginLogout></LoginLogout></li>
                </ul>
                {this.state.authenticated && <UserInfo></UserInfo>}
            </>
        )
    }
}

export default Menu;