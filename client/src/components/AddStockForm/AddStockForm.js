import React, { Component } from 'react';
import './AddStockForm.css';

import { PrimaryButton, DefaultButton, TextField, Stack, ComboBox, DatePicker } from 'office-ui-fabric-react';

export class AddStockForm extends Component {


  stockCodeOptions = [{ key: 'IVVB11', text: 'IVVB11' }];

  AddStockForm() {

  }

  render() {
    return (
      <Stack className="form-add-bought-stocks">
        <form>
          <Stack horizontal>
              <ComboBox 
              autoComplete="on"
              label="Stock Code:"
              id="input-stock-code"
              className="space-from-right-5"
              options={this.stockCodeOptions}></ComboBox>
              <TextField label="Quantity:" type="number" id="input-stock-qtd" className="space-from-right-5"></TextField>
              <TextField label="Avg Price:" type="number" id="input-stock-price" className="space-from-right-5"></TextField>
              <DatePicker label="Date:" isMonthPickerVisible={false} type="date" id="input-stock-buy-date" className="space-from-right-5"></DatePicker>
          {/* </Stack> */}
          {/* <Stack horizontal className="form-add-stock-buttons"> */}
            <PrimaryButton variant="primary" className="space-from-right-5">Save</PrimaryButton>
            <DefaultButton variant="secondary">Clean</DefaultButton>
          </Stack>
        </form>
      </Stack>
    );
  }

}
