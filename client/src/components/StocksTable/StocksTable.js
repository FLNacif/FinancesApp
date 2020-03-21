import React, { Component } from "react";
import { DetailsList, Stack } from "office-ui-fabric-react";
import './StocksTable.css'
import currencyFormatter from "../../shared/formatters/currencyFormatter";
import decimalPlacesFormatter from "../../shared/formatters/decimalPlacesFormatter";

import { getPosition } from "../../services/operation.service"

export class StocksTable extends Component {

    state = {
        columns: [
            {
                key: 'Stock',
                name: 'Stock',
                fieldName: 'code',
                isRowHeader: true,
            },
            {
                key: 'Price',
                name: 'Price',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'price'
            },
            {
                key: 'Weight',
                name: 'Weight',
                fieldName: 'weight',
            },
            {
                key: 'HaveShares',
                name: 'Have Shares',
                fieldName: 'haveShares',
            },
            {
                key: 'AvgPrice',
                name: 'Avg Price',
                fieldName: 'avgPrice',
            },
            {
                key: 'Invested',
                name: 'Invested',
                fieldName: 'invested',
            },
            {
                key: 'HaveMoney',
                name: 'Have Money',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'haveMoney'
            },
            {
                key: 'Action',
                name: 'Action',
                fieldName: 'action'
            },
            {
                key: 'IdealPct',
                name: 'Ideal %',
                onRender: this.onRenderPercentageColumn,
                fieldName: 'idealPct'
            },
            {
                key: 'IdealMoney',
                name: 'Ideal Money',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'idealMoney'
            },
            {
                key: 'MissingMoney',
                name: 'Missing Money',
                onRender: this.onRenderCurrencyColumn,
                fieldName: 'missingMoney'
            },
            {
                key: 'MissingShares',
                name: 'Missing Shares',
                fieldName: 'missingShares'
            },
            {
                key: 'EquityVariation',
                name: 'Equity Variation',
                fieldName: 'variation'
            },
        ],

        items: [
        ]
    }

    componentDidMount() {
        getPosition().then(ops => {
            this.setState({ items: ops.data });
        }).catch(err => {
            // panic(err)
        })
    }

    onRenderCurrencyColumn(item, index, column) {
        return (
            currencyFormatter(item[column.fieldName], item.currency)
        )
    }

    onRenderPercentageColumn(item, index, column) {
        return decimalPlacesFormatter(item[column.fieldName], 2) + ' %'
    }

    render() {
        return (
            <Stack className="stock-table-stack">
                <DetailsList
                    items={this.state.items}
                    columns={this.state.columns}>
                </DetailsList>
            </Stack>
        );
    }
}