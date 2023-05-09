const express = require('express');

const { StatusCode, HttpError } = require('../utils/commonObject.util');

const notFound = (req, res, next) => {
    next(new HttpError(StatusCode.NOT_FOUND, "Error! Invalid APIs route"));
}

const error = (err, req, res, next) => {
    if (err.message) {
        console.log(err);
    }

    err.statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;

    if (err.statusCode == StatusCode.INTERNAL_SERVER_ERROR) {
        err.message = "Internal Server Error"
    }

    res.status(err.statusCode).json({
        message: err.message
    })
}

module.exports = { notFound, error };