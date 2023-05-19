/**
 * Utility functions for the application.
 * @module Utils
 */

const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
/**
 * Checks if the given request is for a public route.
 * A route is considered public if it is for user login, user signup, or GET requests to blog routes.
 * @param {Object} req - The request object to check.
 * @returns {boolean} True if the request is for a public route, false otherwise.
 */

const isPublicRoute = (req) => {

    const api = process.env.API_URL;

    if (
        req.originalUrl === `${api}/user/login` ||
        req.originalUrl === `${api}/user/signup` ||
        (req.originalUrl.startsWith(`${api}/blog`) && req.method === 'GET')

    ) {
        return true;
    }
    return false;
}

module.exports = { isPublicRoute }