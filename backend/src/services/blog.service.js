/**
 * Utility functions for the application.
 * @module Services/Blog
 */

const blogRepository = require("../repositories/blog.repository");
const userRepository = require("../repositories/user.repository");

const { v4: uuidv4 } = require('uuid');

const { BlogDto } = require("../dto/response/blog.res.dto");
const { StatusCode, HttpError } = require('../utils/commonObject.util');
const paginationUtils = require('../utils/pagination.util');

/**
 * Returns an object containing blogs, currentPage, totalPages, and totalBlogs based on pagination parameters.
 * @param {object} paginationParameter - An object containing parameters for pagination (page number and limit).
 * @param {number} paginationParameter.page - The current page number.
 * @param {number} paginationParameter.limit - The number of blogs to display per page.
 * @returns {Promise<object>} - An object containing blogs, currentPage, totalPages, and totalBlogs.
 * @throws {HttpError} - Throws an HttpError with a NOT_FOUND status code if there are no blogs.
 */

const getAllBlogs = async (paginationParameter) => {

    const { offset, limit } = paginationUtils.pagination(paginationParameter);
    const { count, rows } = await blogRepository.getAllBlogs(offset, limit);

    if (!rows[0]) {
        return rows;
    }

    // console.log(rows[0].user.name)

    return {
        blogs: rows.map((blog) => new BlogDto(blog)),
        currentPage: paginationUtils.currentPage(offset, limit),
        totalPages: paginationUtils.totalPages(count, limit),
        totalBlogs: count
    };
}

/**
 * Posts a new blog and returns the newly created blog.
 * @param {object} blogPostReqDto - An object containing details of the blog to be posted.
 * @param {string} blogPostReqDto.title - The title of the blog.
 * @param {string} blogPostReqDto.content - The content of the blog.
 * @param {string} blogPostReqDto.userid - The ID of the user who posted the blog.
 * @returns {Promise<object>} - The newly created blog.
 */

const postBlog = async (blogPostReqDto) => {

    const newBlog = {
        blogid: uuidv4(),
        ...blogPostReqDto
    }

    const blog = await blogRepository.postBlog(newBlog);

    return new BlogDto(blog);
}

/**
 * Returns a blog with the specified ID.
 * @param {string} blogid - The ID of the blog to be returned.
 * @returns {Promise<object>} - The blog with the specified ID.
 * @throws {HttpError} - Throws an HttpError with a NOT_FOUND status code if the blog is not found.
 */
const getBlogById = async (blogid) => {
    const blog = await blogRepository.getBlogById(blogid);

    if (!blog) {
        throw new HttpError(StatusCode.NOT_FOUND, "blog not found");
    }

    return new BlogDto(blog);
}

/**
 * Updates a blog by ID.
 * @function
 * @async
 * @param {Object} blogUpdateReqDto - The blog update request data transfer object.
 * @param {string} blogUpdateReqDto.blogid - The ID of the blog to update.
 * @param {string} blogUpdateReqDto.userid - The ID of the user who owns the blog.
 * @returns {Promise<BlogDto>} - The updated blog data transfer object.
 * @throws {HttpError} - The HTTP error that occurred.
 */

const updateBlogById = async (blogUpdateReqDto) => {

    const { blogid, userid } = blogUpdateReqDto;

    const blog = await blogRepository.getBlogById(blogid);

    if (!blog) {
        throw new HttpError(StatusCode.NOT_FOUND, 'Blog not found');
    }

    if (blog.userid !== userid) {
        throw new HttpError(StatusCode.FORBIDDEN, 'You are not authorized to update this blog')
    };

    const updatedBlog = await blogRepository.updateBlogById(blog, blogUpdateReqDto);

    return new BlogDto(updatedBlog);
}

/**
 * Delete a blog by id
 * @function
 * @async
 * @param {string} userid - The id of the user requesting to delete the blog
 * @param {string} blogid - The id of the blog to be deleted
 * @returns {Promise<Object>} - Returns the result of the delete operation
 * @throws {HttpError} - Throws an HttpError with status code 404 if the blog is not found
 * @throws {HttpError} - Throws an HttpError with status code 403 if the requesting user is not authorized to delete the blog
 */

const deleteBlogById = async (userid, blogid) => {
    const blog = await blogRepository.getBlogById(blogid);

    if (!blog) {
        throw new HttpError(StatusCode.NOT_FOUND, 'Blog not found');
    }

    if (blog.userid !== userid) {
        throw new HttpError(StatusCode.FORBIDDEN, 'You are not authorized to delete this blog')
    };
    const result = await blogRepository.deleteBlogById(blog);

    return result;
}

/**
 * Get blogs by author username with pagination
 * @param {string} username - Username of the author
 * @param {object} paginationParameter - Object containing pagination parameters (page, pageSize)
 * @returns {Promise} Promise representing the blogs, pagination details, and total count
 * @throws {HttpError} Error if the user is not found
 */

const getBlogsByAuthorUsername = async (username, paginationParameter) => {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, "User not found");
    }

    const { offset, limit } = paginationUtils.pagination(paginationParameter);

    const { count, rows } = await blogRepository.getBlogsByAuthorUsername(username, offset, limit);

    if (!rows[0]) {
        return rows;
    }

    return {
        blogs: rows.map((blog) => new BlogDto(blog)),
        currentPage: paginationUtils.currentPage(offset, limit),
        totalPages: paginationUtils.totalPages(count, limit),
        totalBlogs: count
    };
}

const getSearchResults = async (query) => {
    const result = await blogRepository.getSearchResults(query);

    return result;
}

module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername,
    getSearchResults
}