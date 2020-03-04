import React, { Component } from 'react';
import './TransferedBrokerForm.css';

import { PrimaryButton, DefaultButton, TextField, Stack, ComboBox, DatePicker } from 'office-ui-fabric-react';

export class TransferedBrokerForm extends Component {


  stockCodeOptions = [{ key: 'IVVB11', text: 'IVVB11' }];

  AddStockForm() {

  }

  render() {
    return (
      <Stack className="form-add-bought-stocks">
        <form>
          <Stack horizontal>
              <TextField label="Amount:" type="number" id="input-amount-broker" className="space-from-right-5"></TextField>
              <DatePicker label="Date:" isMonthPickerVisible={false} type="date" id="input-amount-broker-date" className="space-from-right-5"></DatePicker>
          {/* </Stack> */}
          {/* <Stack horizontal className="form-add-stock-buttons"> */}
            <PrimaryButton variant="primary" className="space-from-right-5">Save</PrimaryButton>
          </Stack>
        </form>
      </Stack>
    );
  }

}
