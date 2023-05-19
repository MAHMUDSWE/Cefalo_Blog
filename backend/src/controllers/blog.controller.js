/**
 * Auth controller module.
 * @module Controllers/Blog
 * @description Controller functions for handling authentication related operations
 */

const express = require('express');

const blogService = require('../services/blog.service');

const { BlogPostReqDTO, BlogUpdateReqDTO } = require('../dto/request/blog.req.dto');
const { StatusCode } = require('../utils/commonObject.util');
const convertData = require('../utils/convertData.util');

/**
 * Get all blog posts
 * @function
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const getAllBlogs = async (req, res, next) => {
    try {
        const paginationParameter = req.query;
        const data = await blogService.getAllBlogs(paginationParameter);

        const convertedData = convertData(data, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);
    } catch (error) {
        next(error);
    }
}

/**
 * Post a new blog
 * @function
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const postBlog = async (req, res, next) => {
    try {
        const { title, content, status } = req.body;
        const userid = req.userid;

        const blogPostReqDto = new BlogPostReqDTO({
            userid, title, content, status
        })

        const blog = await blogService.postBlog(blogPostReqDto);

        const convertedData = convertData(blog, req.requestedFormat)

        res.status(StatusCode.CREATED).send(convertedData);
    } catch (error) {
        next(error);
    }
}

/**
 * Get a blog by ID
 * @function
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const getBlogById = async (req, res, next) => {
    try {
        const { blogid } = req.params

        const blog = await blogService.getBlogById(blogid);

        const convertedData = convertData(blog, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);
    } catch (error) {
        next(error);
    }
}

/**
 * Update a blog by ID
 * @function
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const updateBlogById = async (req, res, next) => {
    try {
        const { userid } = req
        const { blogid } = req.params;
        const { title, content, status } = req.body;

        const blogUpdateReqDto = new BlogUpdateReqDTO({
            blogid, userid, title, content, status
        })

        const updatedBlog = await blogService.updateBlogById(blogUpdateReqDto);

        const convertedData = convertData(updatedBlog, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

/**
 * Deletes a blog post by ID
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.userid - The ID of the authenticated user making the request
 * @param {Object} req.params - URL parameters object
 * @param {string} req.params.blogid - The ID of the blog post to delete
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Promise<void>} - Promise that resolves when the blog post has been deleted
 * @throws {Error} - If there is an error deleting the blog post
 */

const deleteBlogById = async (req, res, next) => {
    try {
        const { userid } = req
        const { blogid } = req.params;

        await blogService.deleteBlogById(userid, blogid);

        const convertedData = convertData({
            message: "Blog successfully deleted"
        }, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

/**
 * Gets all blog posts authored by a given user
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters object
 * @param {string} req.params.username - The username of the author to retrieve blog posts for
 * @param {Object} req.query - Query parameters object
 * @param {string} req.query.page - The page number of the results to retrieve
 * @param {string} req.query.limit - The maximum number of results to retrieve per page
 * @param {string} req.requestedFormat - The format to return the response data in
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Promise<void>} - Promise that resolves with the blog posts for the specified author
 * @throws {Error} - If there is an error retrieving the blog posts
 */

const getBlogsByAuthorUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const paginationParameter = req.query;

        const blogs = await blogService.getBlogsByAuthorUsername(username, paginationParameter);

        const convertedData = convertData(blogs, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername
}