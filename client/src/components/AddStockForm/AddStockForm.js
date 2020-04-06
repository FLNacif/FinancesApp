import React, { Component } from 'react';
import './AddStockForm.css';
import { saveOperation } from '../../services/operation.service'
import { getStocksByName } from '../../services/stock.service'

import { PrimaryButton, DefaultButton, TextField, Stack, VirtualizedComboBox, DatePicker } from 'office-ui-fabric-react';

export class AddStockForm extends Component {

  constructor() {
    super()
    this.state = {
      formControllerAddOperation: {
        shares: 0,
        price: 0,
        date: null,
        stock: {},
      },
      stockOptions: []
    }
  }


  componentDidMount() {
    getStocksByName().then(data =>
      this.setState({
        stockOptions: data.data.map(s => { return { key: s.Id, text: s.StockTicket } })
      })
    );
  }

  AddStockForm() {

  }

  onClickSave(ev) {
    var operation = {
      Stock: this.state.formControllerAddOperation.stock,
      Date: this.state.formControllerAddOperation.date,
      Shares: this.state.formControllerAddOperation.shares,
      AvgPrice: this.state.formControllerAddOperation.price,
    }

    saveOperation(operation).then(data => {
      this.onClean();
    }).catch(err => {
      this.onClean();
    });
  }

  onClean() {
    this.setState(Object.assign(this.state, { formControllerAddOperation: { stock: {} } }));
  }

  setValue(ev) {
    var obj = { ...this.state.formControllerAddOperation }
    obj[ev.target.name] = ev.target.value
    this.setState({ formControllerAddOperation: obj })
  }

  render() {
    return (
      <Stack className="form-add-bought-stocks">
        <form>
          <Stack horizontal>
            <VirtualizedComboBox
              autoComplete="on"
              label="Stock Code:"
              selectedKey={this.state.formControllerAddOperation.stock}
              id="input-stock-code"
              className="space-from-right-5"
              options={this.state.stockOptions}
              onItemClick={(_, value, index) =>
                this.setValue({ target: { value: value.key, name: 'stock' } })
              }
            />
            <TextField
              name="shares"
              value={this.state.formControllerAddOperation.shares}
              onChange={(ev) => this.setValue(ev)}
              label="Quantity:"
              type="number"
              id="input-stock-qtd"
              className="space-from-right-5"></TextField>
            <TextField
              name="price"
              value={this.state.formControllerAddOperation.price}
              onChange={(ev) => this.setValue(ev)}
              label="Avg Price:"
              type="number"
              id="input-stock-price"
              className="space-from-right-5"></TextField>
            <DatePicker name="date"
              label="Date:"
              value={this.state.formControllerAddOperation.date}
              isMonthPickerVisible={false}
              type="date"
              id="input-stock-buy-date"
              className="space-from-right-5"
              onSelectDate={(value) => {
                this.setValue({ target: { value: value, name: 'date' } })
              }}
            ></DatePicker>

            <PrimaryButton onClick={this.onClickSave.bind(this)} variant="primary" className="space-from-right-5">Save</PrimaryButton>
            <DefaultButton onClick={this.onClean.bind(this)} variant="secondary">Clean</DefaultButton>
          </Stack>
        </form>
      </Stack>
    );
  }

}
