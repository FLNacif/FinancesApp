import decimalPlacesFormatter from './decimalPlacesFormatter'
function currencyFormatter(value, currency = 'BRL') {
    if (typeof (value) == typeof (0)) {
        switch (currency) {
            case 'BRL':
                return 'R$ ' + decimalPlacesFormatter(value, 2).toString().replace('.', ',');
            default:
                return value;
        }
    }
    return value;
}

export default currencyFormatter;