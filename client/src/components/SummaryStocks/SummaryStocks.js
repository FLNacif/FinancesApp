import React, { Component } from "react";
import './SummaryStocks.css'
import { Stack, Label, Text } from "office-ui-fabric-react";
import currencyFormatter from "../../shared/formatters/currencyFormatter";
import decimalPlacesFormatter from "../../shared/formatters/decimalPlacesFormatter";
import Card from "../../shared/components/Card";
import { GlobalStore } from "../../services/GlobalStore";
import { hideShowValues } from '../../shared/const';

export class SummaryStocks extends Component {

    constructor() {
        super()
        this.state = { showHideValues: GlobalStore.lookAt(hideShowValues) }
    }

    componentWillUnmount() {
        this.showHideValuesSubscriber.unsubscribe();
    }

    componentDidMount() {
        this.showHideValuesSubscriber = GlobalStore.subscribe(hideShowValues, (v) => this.setState({ showHideValues: v }), true)
    }

    render() {
        return (
            <Card style={{ display: 'inline-block' }}>
                <Stack horizontal>
                    <Stack className="summary-stock-stack">
                        <Label>Transfered To Broker:</Label> <Text>{currencyFormatter(100, this.state.showHideValues)}</Text>
                        <Label>Withdraw From Broker:</Label> <Text>{currencyFormatter(0, this.state.showHideValues)}</Text>
                        <Label>Total In Broker:</Label> <Text>{currencyFormatter(100, this.state.showHideValues)}</Text>
                    </Stack>
                    <Stack className="summary-stock-stack">
                        <Label>Total Invested:</Label> <Text>{currencyFormatter(100, this.state.showHideValues)}</Text>
                        <Label>Actual Position:</Label> <Text>{currencyFormatter(110, this.state.showHideValues)}</Text>
                    </Stack>
                    <Stack className="summary-stock-stack">
                        <Label>Profit:</Label> <Text>{currencyFormatter(10, this.state.showHideValues)}</Text>
                        <Label>Profit %:</Label> <Text>{decimalPlacesFormatter(10) + ' %'}</Text>
                    </Stack>
                </Stack>
            </Card>
        );
    }
}   