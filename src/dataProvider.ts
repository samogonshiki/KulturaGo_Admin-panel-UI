import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

const API_URL = '/api/v1';

const httpClient = (url: string, options: any = {}) => {
    options.credentials = 'include';
    options.headers = options.headers ?? new Headers({ Accept: 'application/json' });
    const token = null;
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(API_URL, httpClient);

export default dataProvider;