import { GlobalStore } from "../../services/GlobalStore";
import axios from 'axios'

export function authorizedRequest(method, url, body = {}, header = {}) {
    let authorizedHeader = Object.assign(header, {
        "Authorization": "Bearer " + GlobalStore.lookAt('keycloak').token
    });

    return GlobalStore.lookAt('keycloak').updateToken(30).then(function () {
        if (method.toUpperCase() === 'GET') {
            return axios.get(url, { headers: authorizedHeader });
        }

        if (method.toUpperCase() === 'POST') {
            return axios.post(url, body, { headers: authorizedHeader });
        }
    }).catch(function (err) {
        console.log(err)
    });
}