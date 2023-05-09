const express = require('express');

const isPublicRoute = (req) => {

    const api = process.env.API_URL;

    if (req.originalUrl === (`${api}/user/login`)) {
        return true;
    }
    else if (req.originalUrl === (`${api}/user/signup`)) {
        return true;
    }
    else if (req.originalUrl.startsWith(`${api}/blog`) && req.method === 'GET') {
        if (req.params.blogid) {
            return true;
        }
        return true;
    }
}

module.exports = { isPublicRoute }