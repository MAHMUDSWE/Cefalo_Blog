const express = require('express');
const Blog = require("../models/blog.model")

const getAllBlogs = (req, res) => {
    res.send("get all blogs");
}

const postBlog = (req, res) => {
    res.send("post blog");
}

const getBlogById = (req, res) => {
    res.send("controller for single blog by id");
}

const updateBlogById = (req, res) => {
    res.send("controller for updating a blog by id");
}

const deleteBlogById = (req, res) => {
    res.send("controller for deleting a blog by id");
}

const getBlogsByAuthorUsername = (req, res) => {
    res.send("controller for getting blog of specific user");
}

module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername
}