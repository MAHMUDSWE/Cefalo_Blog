const express = require('express');

class BlogPostReqDTO {
    constructor({ userid, title, content, status }) {
        this.userid = userid;
        this.title = title;
        this.content = content;
        this.status = status;
    }
}

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