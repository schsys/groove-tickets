import axios from 'axios';
// import * as errors from '../../common/constants/errors.js';
// import * as httpStatusCodes from '../../common/constants/httpStatusCodes.js';
// axios.defaults.baseURL = "http://localhost:3001"; // al crear la variable de entorno esta declaracion ya no tiene efecto
// axios.defaults.timeout = 20000;

export async function getCustomer(userName) {
    try {
        const endpoint = `/user?userName=${userName}`;
        const response = await axios.get(endpoint);
        response.ok = true;
        console.log('getCustomer response: ', response);
        return response;
    } catch (error) {
        return handleError(error);
    }
}

export async function postOrder(data) {
    try {
        const endpoint = '/order';
        const response = await axios.post(endpoint, data);
        response.ok = true;
        console.log('createOrder response: ', response);
        return response;
    } catch (error) {
        return handleError(error);
    }
}

function handleError(error) {
    // console.log('api error: ', error);
    const response = {
        ok: false,
        error: {
            message: 'Error processing last action',
            status: error.response && error.response.status
        }
    };

    return response;
}