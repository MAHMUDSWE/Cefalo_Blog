
/**
 * Module representing DTOs for blog requests
 * @module DTO/request/blog
 */

const express = require('express');

/**
 * Class representing the request data for creating a new blog post
 * @class
 * @classdesc BlogPostReqDTO contains the properties required for creating a new blog post
 * @property {string} userid - The id of the user creating the blog post
 * @property {string} title - The title of the blog post
 * @property {string} content - The content of the blog post
 * @property {string} status - The status of the blog post, either "published" or "draft"
 */
class BlogPostReqDTO {
    constructor({ userid, title, content, status }) {
        this.userid = userid;
        this.title = title;
        this.content = content;
        this.status = status;
    }
}

/**
 * Class representing the request data for updating an existing blog post
 * @class
 * @classdesc BlogUpdateReqDTO contains the properties required for updating an existing blog post
 * @property {string} blogid - The id of the blog post being updated
 * @property {string} userid - The id of the user updating the blog post
 * @property {string} title - The new title of the blog post
 * @property {string} content - The new content of the blog post
 * @property {string} status - The new status of the blog post, either "published" or "draft"
 */
class BlogUpdateReqDTO {
    constructor({ blogid, userid, title, content, status }) {
        this.blogid = blogid;
        this.userid = userid;
        this.title = title;
        this.content = content;
        this.status = status;
    }
}

module.exports = {
    BlogPostReqDTO,
    BlogUpdateReqDTO
};
