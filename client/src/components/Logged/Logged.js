import React from 'react'
import UserInfo from '../../components/UserInfo/UserInfo';
import LoginLogout from '../LoginLogout/LoginLogout';

class Logged extends React.Component {

    render() {
        return (
            <>
                <UserInfo></UserInfo>
                <LoginLogout></LoginLogout>
            </>
        )
    }
}

export default Logged;