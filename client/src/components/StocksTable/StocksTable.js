import React, { Component } from "react";
import { DetailsList, Stack, SelectionMode } from "office-ui-fabric-react";
import './StocksTable.css'
import currencyFormatter from "../../shared/formatters/currencyFormatter";
import decimalPlacesFormatter from "../../shared/formatters/decimalPlacesFormatter";

import { getPosition } from "../../services/operation.service"
import { GlobalStore } from "../../services/GlobalStore";
import { hideShowValues } from '../../shared/const';

export class StocksTable extends Component {

    state = {
        columns: [
            {
                key: 'Stock',
                name: 'Stock',
                fieldName: 'Code',
                isRowHeader: true,
            },
            {
                key: 'Price',
                name: 'Price',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'Price',
                alwaysShowValue: true
            },
            {
                key: 'Weight',
                name: 'Weight',
                fieldName: 'Weight',
            },
            {
                key: 'HaveShares',
                name: 'Have Shares',
                fieldName: 'HaveShares',
            },
            {
                key: 'AvgPrice',
                name: 'Avg Price',
                fieldName: 'AvgPrice',
            },
            {
                key: 'Invested',
                name: 'Invested',
                fieldName: 'Invested',
            },
            {
                key: 'HaveMoney',
                name: 'Have Money',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'HaveMoney'
            },
            {
                key: 'HavePct',
                name: 'Have %',
                onRender: this.onRenderPercentageColumn,
                fieldName: 'HavePct'
            },
            {
                key: 'Action',
                name: 'Action',
                fieldName: 'Action'
            },
            {
                key: 'IdealPct',
                name: 'Ideal %',
                onRender: this.onRenderPercentageColumn,
                fieldName: 'IdealPct'
            },
            {
                key: 'IdealMoney',
                name: 'Ideal Money',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'IdealMoney'
            },
            {
                key: 'MissingMoney',
                name: 'Missing Money',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'MissingMoney'
            },
            {
                key: 'MissingShares',
                name: 'Missing Shares',
                fieldName: 'MissingShares'
            },
            {
                key: 'EquityVariation',
                name: 'Equity Variation',
                fieldName: 'Variation'
            },
        ],

        items: [
        ],
        }

    componentWillUnmount() {
        this.showHideValuesSubscriber.unsubscribe();
    }

    componentDidMount() {
        getPosition().then(ops => {
            this.setState({ items: ops.data.map(it => Object.assign(it, {showHideValues: GlobalStore.lookAt(hideShowValues)})) });
        }).catch(err => {
            // panic(err)
        })
        this.showHideValuesSubscriber = GlobalStore.subscribe(hideShowValues, (v) =>this.setState({items: this.state.items.map(it => Object.assign(it, {showHideValues: v}))}), true)
    }

    onRenderCurrencyColumn(item, index, column) {
        return currencyFormatter(item[column.fieldName], item.showHideValues || column.alwaysShowValue === true, item.currency)
        
    }

    onRenderPercentageColumn(item, index, column) {
        return decimalPlacesFormatter(item[column.fieldName], 2) + ' %'
    }

    render() {
        return (
            <Stack className="stock-table-stack">
                <DetailsList
                    items={this.state.items}
                    columns={this.state.columns}
                    selectionMode={SelectionMode.none}
                    >
                </DetailsList>
            </Stack>
        );
    }
}