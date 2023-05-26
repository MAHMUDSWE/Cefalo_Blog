import axios from 'axios';
import apiEndpoint from './endpoint.util';
import { getAccessToken } from './token.util';

const axiosInstance = axios.create({
    baseURL: apiEndpoint.base,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.request.use((req) => {
    req.headers.authorization = `Bearer ${getAccessToken}`;
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         req.headers['Authorization'] = `Bearer ${token}`;
    //     }
    //     return req;
    // },
    //     (error) => {
    //         return Promise.reject(error);
    return req;
}
);

export default axiosInstance;
