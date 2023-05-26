import { useContext } from 'react';

import axiosInstance from '../../utils/axios.util';
import { AuthContext } from '../contexts/AuthContext';
import apiEndpoint from '../../utils/endpoint.util';
import { removeAccessToken, storeAccessToken } from '../../utils/token.util';

const AuthService = () => {
    const { updateAuthData } = useContext(AuthContext);

    const signup = async (userData) => {
        try {
            const response = await axiosInstance.post(apiEndpoint.auth.signup, userData);
            const { user } = response.data;

            return user;
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post(apiEndpoint.auth.login, credentials);
            const { access_token } = response.data;

            storeAccessToken(access_token);

        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async () => {
        try {
            //  await axiosInstance.post(apiEndpoint.auth.logout);

            removeAccessToken();

        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return {
        signup,
        login,
        logout,
    };
};

export default AuthService;
