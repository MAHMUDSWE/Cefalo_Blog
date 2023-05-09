const express = require('express');
const jwt = require("jsonwebtoken");

const authUtils = require('../utils/auth.util')

const { StatusCode, HttpError } = require('../utils/commonObject.util');
const { isPublicRoute } = require('../utils/publicRoute.util');


const Authentication = (req, res, next) => {
    try {

        if (isPublicRoute(req)) {
            return next();
        }

        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

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