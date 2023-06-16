/**
 * Blog repository module.
 * @module Repositories/Blog
 * @description Repositories functions for handling Blog related operations
 */

const { Op, sequelize } = require('../configs/sequelize.config');
const Blog = require('../models/blog.model');
const User = require('../models/user.model');

/**
 * Get all blogs with their respective author details
 * @async
 * @function
 * @param {number} offset - The starting index of the results to return
 * @param {number} limit - The maximum number of results to return
 * @returns {Promise<{rows: Blog[], count: number}>} A promise that resolves to an object with a rows property that contains an array of Blog instances and a count property that contains the total number of rows found
 */

const getAllBlogs = async (offset, limit) => {
    const result = await Blog.findAndCountAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return result;
}

/**
 * Create a new blog
 * @async
 * @function
 * @param {Object} newBlog - The new blog to create
 * @param {string} newBlog.blogid - The ID of the blog to create
 * @param {string} newBlog.userid - The ID of the author of the blog
 * @param {string} newBlog.title - The title of the blog
 * @param {string} newBlog.content - The content of the blog
 * @param {string} newBlog.status - The status of the blog
 * @returns {Promise<Blog>} A promise that resolves to the created Blog instance with its author details
 */

const postBlog = async (newBlog) => {
    const { blogid, userid, title, content, status } = newBlog;

    const blog = await Blog.create({
        blogid, userid, title, content, status
    });

    await blog.reload({
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return blog;
}

/**
 * Get a blog by its ID
 * @async
 * @function
 * @param {string} blogid - The ID of the blog to retrieve
 * @returns {Promise<Blog>} A promise that resolves to the retrieved Blog instance with its author details
 */

const getBlogById = async (blogid) => {
    const blog = await Blog.findOne({
        where: { blogid },
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return blog;
}

/**
 * Update a blog by its ID
 * @async
 * @function
 * @param {Blog} blog - The Blog instance to update
 * @param {Object} blogUpdateReqDto - The updated blog data
 * @param {string} blogUpdateReqDto.title - The updated title of the blog
 * @param {string} blogUpdateReqDto.content - The updated content of the blog
 * @param {string} blogUpdateReqDto.status - The updated status of the blog
 * @returns {Promise<Blog>} A promise that resolves to the updated Blog instance
 */

const updateBlogById = async (blog, blogUpdateReqDto) => {
    const { title, content, status } = blogUpdateReqDto;
    return await blog.update({ title, content, status });
}

/**
 * Delete a blog by ID.
 * @async
 * @param {Object} blog - The blog to be deleted.
 * @returns {Promise<void>} A Promise representing the operation result.
 */

const deleteBlogById = async (blog) => {

    return await blog.destroy();
}

/**
 * Get blogs by author username.
 * @async
 * @param {string} username - The author's username.
 * @param {number} offset - The number of results to skip.
 * @param {number} limit - The maximum number of results to return.
 * @returns {Promise<{ count: number, rows: Object[] }>} A Promise representing the blogs found.
 */

const getBlogsByAuthorUsername = async (username, offset, limit) => {
    const result = await Blog.findAndCountAll({
        where: { '$user.username$': username },
        offset,
        limit,
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return result;
};
const getSearchResults = async (query) => {
    const result = await Blog.findAll({
        attributes: ['blogid', 'title', 'createdAt'],
        where: {
            [Op.or]: [
                { '$user.username$': { [Op.like]: `%${query}%` } },
                { '$user.name$': { [Op.like]: `%${query}%` } },
                { title: { [Op.like]: `%${query}%` } },
            ],
        },
        order: [['createdAt', 'DESC']],
        include: {
            model: User,
            as: 'user',
            attributes: ['name', 'username'],
            required: false,
        },
        limit: 10
    });

    return result;
    // const result = await User.findAll({
    //     attributes: ['name', 'username'],
    //     include: [
    //         {
    //             model: Blog,
    //             as: 'blog',
    //             where: {
    //                 [Op.or]: [
    //                     { 'title': { [Op.like]: `%${query}%` } },
    //                     { '$tbl_user.username$': { [Op.like]: `%${query}%` } },
    //                     { '$tbl_user.name$': { [Op.like]: `%${query}%` } },
    //                 ],
    //             },
    //             attributes: ['blogid', 'title', 'createdAt'],
    //             required: true,
    //         },
    //     ],
    //     order: [[{ model: Blog, as: 'blog' }, 'createdAt', 'DESC']],
    // });

    // return result;
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