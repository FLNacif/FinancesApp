import {authorizedRequest} from '../shared/auth/auth';
import { config } from '../config'

function saveOperation(operation) {
    return authorizedRequest('POST',config.server + 'stockoperation/save', operation);
}

function getPosition() {
    return authorizedRequest('GET',config.server + 'stockoperation/getpositions');
}

export { saveOperation, getPosition }