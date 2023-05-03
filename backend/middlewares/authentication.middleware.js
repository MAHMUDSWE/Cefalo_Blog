const express = require('express');
const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
    next();
}

module.exports = Authentication;