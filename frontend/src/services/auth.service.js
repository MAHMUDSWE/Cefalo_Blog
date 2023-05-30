import axiosInstance from '../utils/axios.util';
import apiEndpoint from '../utils/endpoint.util';
import { removeAccessToken, storeAccessToken } from '../utils/token.util';

// const AuthService = () => {
const signup = async (userData) => {
    try {
        const response = await axiosInstance.post(apiEndpoint.auth.signup, userData);
        const data = response.data;

        return data;
    } catch (error) {
        console.error('Error signing up:', error);
    }
};

const login = async (credentials) => {
    // try {
    const response = await axiosInstance.post(apiEndpoint.auth.login, credentials);
    const data = response.data;

    return data;

    // } catch (error) {
    //     console.error('Error logging in:', error);
    // }
};

const logout = async () => {
    try {
        //  await axiosInstance.post(apiEndpoint.auth.logout);

        removeAccessToken();

    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export const AuthService = {
    signup, login, logout
}
