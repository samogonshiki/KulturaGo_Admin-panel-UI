import { AuthProvider, fetchUtils } from 'react-admin';

const API_URL = '/api/v1';

const httpClient = (url: string, options: any = {}) => {
    options.credentials = 'include';
    options.headers = options.headers ?? new Headers({ 'Content-Type': 'application/json' });
    return fetchUtils.fetchJson(url, options);
};

const authProvider: AuthProvider = {
    login: ({ username, password }) =>
        fetch(`${API_URL}/admin/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        }).then(res => {
            if (res.status < 200 || res.status >= 300) {
                return Promise.reject(new Error('Неверный логин или пароль'));
            }
            return Promise.resolve();
        }),

    logout: () => {
        return Promise.resolve();
    },

    checkAuth: () =>
        fetch(`${API_URL}/auth/access`, {
            method: 'GET',
            credentials: 'include',
        }).then(res => {
            if (res.status < 200 || res.status >= 300) {
                return Promise.reject();
            }
            return Promise.resolve();
        }),

    checkError: (error: any) => {
        const status = error.status as number;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
};

export default authProvider;