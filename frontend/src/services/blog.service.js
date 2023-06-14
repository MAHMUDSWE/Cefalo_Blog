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

const getSpecificBlog = async (blogid) => {
    const url = apiEndpoint.blog.getSpecific.replace(':blogid', blogid);
    const response = await axiosInstance.get(url);
    const blog = response.data;
    return blog;
};

const updateBlog = async ({ blogid, updatedBlogData }) => {

    const url = apiEndpoint.blog.update.replace(':blogid', blogid);
    const response = await axiosInstance.put(url, updatedBlogData);
    const updatedBlog = response.data;

    return updatedBlog;
};

const deleteBlog = async ({ blogid }) => {

    const url = apiEndpoint.blog.delete.replace(':blogid', blogid);
    const response = await axiosInstance.delete(url);

    return 'Blog deleted successfully'
};

const getBlogsByUser = async (username, { page, limit }) => {
    // const url = apiEndpoint.blog.getListByUser + `?page=${page}&limit=${limit}`.replace(':username', username);
    const url = apiEndpoint.blog.getListByUser.replace(':username', username) + `?page=${page}&limit=${limit}`;
    const response = await axiosInstance.get(url);
    const blogs = response.data;

    return blogs
};

const getSearchResult = async (query) => {
    const url = apiEndpoint.blog.getSearchResult.replace(':query', query);
    const response = await axiosInstance.get(url);
    const result = response.data;

    return result
}

export const BlogService = {
    getAllBlogs, createBlog, getSpecificBlog, updateBlog, deleteBlog, getBlogsByUser, getSearchResult
}
