const express = require('express');

class BlogDto {
    constructor({ blogid, userid, title, content, status, createdAt, updatedAt }) {
        this.blogid = blogid;
        this.userid = userid;
        this.title = title;
        this.content = content;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = { BlogDto };
