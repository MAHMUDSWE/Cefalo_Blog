const express = require('express');

const { StatusCode, HttpError } = require('../utils/commonObject.util');
const convertData = require('../utils/convertData.util');

const notFound = (req, res, next) => {
    next(new HttpError(StatusCode.NOT_FOUND, "Error! Invalid APIs route"));
}

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