/**
 * Module representing DTOs for signup requests
 * @module Middleware/ErrorHandler
 */

const express = require('express');

const { StatusCode, HttpError } = require('../utils/commonObject.util');
const convertData = require('../utils/convertData.util');

/**
 * Middleware function to handle invalid API routes.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */

const notFound = (req, res, next) => {
    next(new HttpError(StatusCode.NOT_FOUND, "Error! Invalid APIs route"));
}


/**
 * Middleware function to handle errors.
 * @param {object} err - Error object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 */

const error = (err, req, res, next) => {

    if (!(err instanceof HttpError)) {

        console.log(err);

        err.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
        err.message = "Internal Server Error"
    }

    const convertedMessage = convertData({
        message: err.message
    }, req.requestedFormat)
    res.status(err.statusCode).send(convertedMessage);

}

module.exports = { notFound, error };