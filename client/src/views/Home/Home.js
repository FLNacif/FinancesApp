import React, { Component } from 'react';
import { AddStockForm } from '../../components/AddStockForm/AddStockForm';
import { StocksTable } from '../../components/StocksTable/StocksTable';
import { SummaryStocks } from '../../components/SummaryStocks/SummaryStocks';
import { TransferedBrokerForm } from '../../components/TransferedBrokerForm/TransferedBrokerForm';
import Logged from '../../components/Menu/Menu';
import { GlobalStore } from '../../services/GlobalStore';
import { Redirect } from 'react-router-dom';
import { Login } from '../Login/Login';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: GlobalStore.lookAt('keycloak') }
    }

    componentDidMount() {
        GlobalStore.subscribe('keycloak', keycloak => {
            this.setState({ keycloak });
        })
    }

    render() {
        return (
            <div>
                <TransferedBrokerForm></TransferedBrokerForm>
                <AddStockForm></AddStockForm>
                <SummaryStocks></SummaryStocks>
                <StocksTable></StocksTable>
            </div>
        );
    }
}
