function decimalPlacesFormatter(value, places = 2) {
    if (typeof (value) == typeof (0)) {
        return (Math.round(value * 10 ** places) / 10 ** places).toFixed(places);
    }
    return value;
}

export default decimalPlacesFormatter;