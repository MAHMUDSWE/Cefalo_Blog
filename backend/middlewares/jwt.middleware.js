const express = require('express');
const jwt = require("jsonwebtoken");

const jwtAuthentication = (req, res, next) => {
    next();
}

module.exports = jwtAuthentication;