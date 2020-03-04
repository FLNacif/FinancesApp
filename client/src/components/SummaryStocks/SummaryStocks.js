import React, { Component } from "react";
import './SummaryStocks.css'
import { Stack, Label, Text } from "office-ui-fabric-react";
import currencyFormatter from "../../shared/formatters/currencyFormatter";
import decimalPlacesFormatter from "../../shared/formatters/decimalPlacesFormatter";
import Card from "../../shared/components/Card";

export class SummaryStocks extends Component {
    render() {
        return (
            <Card style={{display:'inline-block'}}>
                <Stack horizontal>
                    <Stack>
                        <Label>Transfered To Broker:</Label> <Text>{currencyFormatter(100)}</Text>
                        <Label>Withdraw From Broker:</Label> <Text>{currencyFormatter(0)}</Text>
                        <Label>Total In Broker:</Label> <Text>{currencyFormatter(100)}</Text>
                    </Stack>
                    <Stack>
                        <Label>Total Invested:</Label> <Text>{currencyFormatter(100)}</Text>
                        <Label>Actual Position:</Label> <Text>{currencyFormatter(110)}</Text>
                    </Stack>
                    <Stack>
                        <Label>Profit:</Label> <Text>{currencyFormatter(10)}</Text>
                        <Label>Profit %:</Label> <Text>{decimalPlacesFormatter(10) + ' %'}</Text>
                    </Stack>
                </Stack>
            </Card>
        );
    }
}   