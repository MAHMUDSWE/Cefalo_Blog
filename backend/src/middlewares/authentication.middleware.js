/**
 * Module representing DTOs for signup requests
 * @module Middleware/authentication
 */

const express = require('express');
const jwt = require("jsonwebtoken");

const authUtils = require('../utils/auth.util')

const { StatusCode, HttpError } = require('../utils/commonObject.util');
const { isPublicRoute } = require('../utils/publicRoute.util');

/**
 * Middleware function to authenticate user using access token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 * @throws {HttpError} - Throws HttpError if token not found or invalid
 */

const Authentication = (req, res, next) => {
    try {

        if (isPublicRoute(req)) {
            return next();
        }

        const token = (req.headers.authorization && req.headers.authorization.split(" ")[1]) || req.cookies.token;

        if (!token) {
            throw new HttpError(StatusCode.UNAUTHORIZED, "Unauthorized, token not found");
        }

        const data = authUtils.verifyAccessToken(token);
        req.userid = data.userid;

        next();

    } catch (error) {
        if (error.message == "JsonWebTokenError" || "TokenExpiredError") {
            next(new HttpError(StatusCode.UNAUTHORIZED, error.message));
        }
        else next(error);
    }
}

module.exports = Authentication;