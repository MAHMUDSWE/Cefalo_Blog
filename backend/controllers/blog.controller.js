const express = require('express');

const blogService = require('../services/blog.service');

const { BlogPostReqDTO, BlogUpdateReqDTO } = require('../dto/request/blog.req.dto');
const { StatusCode } = require('../utils/commonObject.util');
const convertData = require('../utils/converData.util');

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