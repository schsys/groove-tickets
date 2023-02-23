import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiUrl = baseUrl + '/admin';
const httpClient = fetchUtils.fetchJson;

const createHeaders = () => {
    const headers = new Headers({
        Accept: 'application/json',
    });
    headers.set('authorization', sessionStorage.getItem("accessToken"));
    headers.set('user', sessionStorage.getItem("userName"));

    return headers;
}

export const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            page: page - 1,
            size: perPage,
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url, { headers: createHeaders() }).then(({ json }) => ({
            data: json.rows,
            total: json.count,
        }));
    },
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, { headers: createHeaders() }).then(({ json }) => ({
            data: json,
        })),
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log('dataProvider.getMany params.ids: ', params.ids);
        return httpClient(url, { headers: createHeaders() }).then(({ json }) => {
            return { data: json.rows };
        });
    },
    update: async (resource, params) => {
        const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: createHeaders()
        });

        console.log('json returned by httpClient: ', response);
        return { data: response.json };

    },
    create: async (resource, params) => {
        const response = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: createHeaders()
        });

        console.log('json returned by httpClient: ', response.json);
        return { data: { ...params.data, id: response.json.id } };
    },
    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: createHeaders()
        }).then(({ json }) => ({ data: json })),
};
