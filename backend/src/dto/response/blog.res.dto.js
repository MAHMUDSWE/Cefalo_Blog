/**
 * Module representing DTOs for signup requests
 * @module DTO/response/blog
 */

const express = require('express');


/**
 * Represents a blog data transfer object (DTO).
 * @class
 * @param {Object} data - The data used to create the DTO.
 * @param {string} data.blogid - The unique ID of the blog.
 * @param {Object} data.user - The user object associated with the blog.
 * @param {string} data.user.name - The name of the user who created the blog.
 * @param {string} data.user.username - The username of the user who created the blog.
 * @param {string} data.title - The title of the blog.
 * @param {string} data.content - The content of the blog.
 * @param {string} data.createdAt - The date and time the blog was created.
 * @param {string} data.updatedAt - The date and time the blog was last updated.
 */

class BlogDto {
    constructor({ blogid, user, title, content, createdAt, updatedAt }) {
        this.blogid = blogid;
        this.name = user.name;
        this.username = user.username;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = { BlogDto };
