import React, { Component } from 'react';
import './Home.css';
import { AddStockForm } from '../../components/AddStockForm/AddStockForm';
import { StocksTable } from '../../components/StocksTable/StocksTable';
import { SummaryStocks } from '../../components/SummaryStocks/SummaryStocks';
import { TransferedBrokerForm } from '../../components/TransferedBrokerForm/TransferedBrokerForm';

export class Home extends Component {
    
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
