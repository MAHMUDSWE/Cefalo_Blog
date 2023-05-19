const express = require('express');

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
