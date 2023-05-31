import axiosInstance from "../utils/axios.util";
import apiEndpoint from "../utils/endpoint.util";

const getAllBlogs = async ({ page, limit }) => {
    const response = await axiosInstance.get(apiEndpoint.blog.getAll + `?page=${page}&limit=${limit}`);
    const blogs = response.data;
    return blogs;
};

const createBlog = async (blogData) => {

    const response = await axiosInstance.post(apiEndpoint.blog.create, blogData);
    const createdBlog = response.data;

    return createdBlog;

};

const getSpecificBlog = async (blogId) => {
    const url = apiEndpoint.blog.getSpecific.replace(':blogid', blogId);
    const response = await axiosInstance.get(url);
    const blog = response.data;
    return blog;
};

const updateBlog = async (blogId, updatedData) => {

    const url = apiEndpoint.blog.update.replace(':blogid', blogId);
    const response = await axiosInstance.put(url, updatedData);
    const updatedBlog = response.data;

    return updatedBlog;
};

const deleteBlog = async (blogId) => {

    const url = apiEndpoint.blog.delete.replace(':blogid', blogId);
    const response = await axiosInstance.delete(url);

    return 'Blog deleted successfully'
};

const getBlogsByUser = async (username) => {

    const url = apiEndpoint.blog.getListByUser.replace(':username', username);
    const response = await axiosInstance.get(url);
    const blogs = response.data;

    return blogs
};

export const BlogService = {
    getAllBlogs, createBlog, getSpecificBlog, updateBlog, deleteBlog, getBlogsByUser
}
