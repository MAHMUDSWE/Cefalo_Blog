const express = require('express');
const StatusCode = require('../utils/objects/statusCode.object');

const errorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;

    res.status(err.statusCode).json({
        message: err.message
    })
}

module.exports = errorHandler;