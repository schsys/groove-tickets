import axios from 'axios';
// import * as errors from '../../common/constants/errors.js';
// import * as httpStatusCodes from '../../common/constants/httpStatusCodes.js';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.timeout = 20000;

export async function getDetailedUser(userName) {
    try {
        const endpoint = `/user?userName=${userName}`;
        const response = await axios.get(endpoint);
        // console.log('getDetaileduser response: ', response);

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

export async function getRecommendedProducts(referencedProductId, categories) {
    try {
        const filter = JSON.stringify({ referencedProductId, categories});
        const endpoint = `/recommended-products?filter=${filter}`;
        const response = await axios.get(endpoint);

        return {
            fetchStatus: "succeeded",
            items: response.data,
            error: null,
        };
    } catch (error) {
        return {
            fetchStatus: "failed",
            items: [],
            error: {
                message: 'Error al obtener los productos recomendados',
                status: error.response && error.response.status
            }
        };
    }
}

export async function getReviews(productId) {
    try {
        const endpoint = `/products/${productId}/reviews`;
        const response = await axios.get(endpoint);

        return {
            fetchStatus: "succeeded",
            data: response.data,
            error: null,
        };
    } catch (error) {
        return {
            fetchStatus: "failed",
            data: null,
            error: {
                message: 'Error al obtener las reviews del producto',
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
