const express = require('express');
const Blog = require("../models/blog.model");

const blogService = require('../services/blog.service');
const StatusCode = require('../utils/objects/statusCode.object');
const HttpError = require('../utils/objects/httpError.object');

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await blogService.getAllBlogs();

        res.status(StatusCode.OK).json({
            blogs
        })
    } catch (error) {
        next(error);
    }
}

const postBlog = async (req, res, next) => {
    try {
        const newBlog = req.body;
        const userid = req.userid;

        const blog = await blogService.postBlog(userid, newBlog);

        res.status(StatusCode.OK).json({
            message: 'Blog post created successfully',
            blog
        });
    } catch (error) {
        next(error);
    }
}

const getBlogById = async (req, res, next) => {
    try {
        const { blogid } = req.params

        const blog = await blogService.getBlogById(blogid);

        res.status(StatusCode.OK).json({
            blog
        })
    } catch (error) {
        next(error);
    }
}

const updateBlogById = async (req, res, next) => {
    try {
        const { userid } = req
        const { blogid } = req.params;
        const { title, content } = req.body;

        const updatedBlog = await blogService.updateBlogById(userid, blogid, title, content);

        res.status(StatusCode.OK).json({
            "message": "Blog successfully updated",
            updatedBlog
        })

    } catch (error) {
        next(error);
    }
}

const deleteBlogById = async (req, res, next) => {
    try {
        const { userid } = req
        const { blogid } = req.params;

        await blogService.deleteBlogById(userid, blogid);

        res.status(StatusCode.OK).json({
            "message": "Blog successfully deleted",
        })

    } catch (error) {
        next(error);
    }
}

const getBlogsByAuthorUsername = async (req, res, next) => {
    try {
        const { username } = req.params;

        const blogs = await blogService.getBlogsByAuthorUsername(username);

        res.status(StatusCode.OK).json({ blogs });

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