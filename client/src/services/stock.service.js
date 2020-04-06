import axios from 'axios';
import { config } from '../config'

function getStocksByName(name="") {
    return axios({
        method: 'GET',
        url: config.server + 'getstockslist/'+name,
    }).catch(function (err) {
        console.log(err)
    });
}

export { getStocksByName }