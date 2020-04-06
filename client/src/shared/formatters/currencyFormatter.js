import decimalPlacesFormatter from './decimalPlacesFormatter'
function currencyFormatter(value, showValue = true, currency = 'BRL') {
    if (typeof (value) == typeof (0)) {
        switch (currency) {
            case 'BRL':
                return 'R$ ' + (showValue? decimalPlacesFormatter(value, 2).toString().replace('.', ',') : "--");
            default:
                return value;
        }
    }
    return value;
}

export default currencyFormatter;