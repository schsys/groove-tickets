import axios from 'axios';
// import * as errors from '../../common/constants/errors.js';
// import * as httpStatusCodes from '../../common/constants/httpStatusCodes.js';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.timeout = 20000;

export async function getDetailedUser(userName) {
    try {
        const endpoint = `/user?userName=${userName}`;
        const response = await axios.get(endpoint);
        console.log('getDetaileduser response: ', response);

        return {
            fetchStatus: "succeeded",
            item: response.data,
            error: null,
        };
    } catch (error) {
        return {
            fetchStatus: "failed",
            item: null,
            error: {
                message: 'Error al obtener el detalle del usuario',
                status: error.response && error.response.status
            }
        };
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
