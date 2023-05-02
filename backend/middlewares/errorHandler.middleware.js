const express = require('express');

const errorHandler = (err, req, res, next) => {
    res.send(err);
}

module.exports = errorHandler;