import axiosInstance from "../utils/axios.util";
import apiEndpoint from "../utils/endpoint.util";

export const getAllBlogs = async () => {
    try {
        const response = await axiosInstance.get(apiEndpoint.blog.getAll);
        const blogs = response.data;
        return blogs;
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
};

export const createBlog = async (blogData) => {
    try {
        const response = await axiosInstance.post(apiEndpoint.blog.create, blogData);
        const createdBlog = response.data;

        return createdBlog;
    } catch (error) {
        console.error('Error creating blog:', error);
    }
};

export const getSpecificBlog = async (blogId) => {
    try {
        const url = apiEndpoint.blog.getSpecific.replace(':blogid', blogId);
        const response = await axiosInstance.get(url);
        const blog = response.data;

        return blog;
    } catch (error) {
        console.error('Error fetching specific blog:', error);
    }
};

export const updateBlog = async (blogId, updatedData) => {
    try {
        const url = apiEndpoint.blog.update.replace(':blogid', blogId);
        const response = await axiosInstance.put(url, updatedData);
        const updatedBlog = response.data;

        return updatedBlog;
    } catch (error) {
        console.error('Error updating blog:', error);
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const url = apiEndpoint.blog.delete.replace(':blogid', blogId);
        const response = await axiosInstance.delete(url);

        return 'Blog deleted successfully'
    } catch (error) {
        console.error('Error deleting blog:', error);
    }
};

export const getBlogsByUser = async (username) => {
    try {
        const url = apiEndpoint.blog.getListByUser.replace(':username', username);
        const response = await axiosInstance.get(url);
        const blogs = response.data;

        return blogs
    } catch (error) {
        console.error('Error fetching blogs by user:', error);
    }
};


