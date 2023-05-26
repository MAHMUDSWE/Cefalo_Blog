import axiosInstance from "../../utils/axios.util";
import apiEndpoint from "../../utils/endpoint.util";

const UserService = {
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get(apiEndpoint.user.getAll);
            return response.data;
        } catch (error) {
            // Handle error fetching all users
            throw error;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const endpoint = apiEndpoint.user.getSpecific.replace(':username', username);
            const response = await axiosInstance.get(endpoint);
            return response.data;
        } catch (error) {
            // Handle error fetching user by username
            throw error;
        }
    },

    updateUserByUsername: async (username, updatedUserData) => {
        try {
            const endpoint = apiEndpoint.user.update.replace(':username', username);
            const response = await axiosInstance.put(endpoint, updatedUserData);
            return response.data;
        } catch (error) {
            // Handle error updating user by username
            throw error;
        }
    },

    deleteUserByUsername: async (username) => {
        try {
            const endpoint = apiEndpoint.user.delete.replace(':username', username);
            const response = await axiosInstance.delete(endpoint);
            return response.data;
        } catch (error) {
            // Handle error deleting user by username
            throw error;
        }
    },
};

export default UserService;
