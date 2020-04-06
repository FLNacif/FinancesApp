import React from 'react'
import UserInfo from '../UserInfo/UserInfo';
import LoginLogout from '../LoginLogout/LoginLogout';
import { GlobalStore } from '../../services/GlobalStore';
import { Link } from 'react-router-dom';
import { Toggle, Stack } from 'office-ui-fabric-react';
import { hideShowValues, keycloak } from '../../shared/const';
import "./Menu.css";

class Menu extends React.Component {
    constructor() {
        super()
        this.state = { authenticated: GlobalStore.lookAt(keycloak)?.authenticated };
    }

    componentWillUnmount() {
        this.keycloakListener.unsubscribe();
    }

    componentDidMount() {
        this.keycloakListener = GlobalStore.subscribe(keycloak, (keycloak) => {
            this.setState({ authenticated: keycloak?.authenticated })
        });
    }

    onToggleShowHideValues(ev, checked) {
        GlobalStore.publish(hideShowValues, checked);
    }

    render() {
        return (
            <Stack>
                <Stack horizontal className="stack-menu">
                    <ul className="main-menu">
                        <li><Link to='/home'>Home</Link></li>
                        <li><LoginLogout></LoginLogout></li>
                    </ul>
                </Stack>
                <Stack className="bottom-menu">
                    {this.state.authenticated && <UserInfo></UserInfo>}
                    <Toggle label="" defaultChecked onText="Hide values" offText="Show values" onChange={this.onToggleShowHideValues} />
                </Stack>
            </Stack>
        )
    }
}

export default Menu;