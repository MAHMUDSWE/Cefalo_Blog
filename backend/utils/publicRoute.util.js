const express = require('express');

const isPublicRoute = (req) => {

    const api = process.env.API_URL;

    if (
        req.originalUrl === `${api}/user/login` ||
        req.originalUrl === `${api}/user/signup` ||
        (req.originalUrl.startsWith(`${api}/blog`) && req.method === 'GET')
    ) {
        return true;
    }

}

module.exports = { isPublicRoute }