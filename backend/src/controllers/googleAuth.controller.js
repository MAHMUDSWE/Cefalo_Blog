const express = require('express');
const { StatusCode } = require('../utils/commonObject.util');

const googleCallback = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(StatusCode.UNAUTHORIZED).json({
                message: 'User not authenticated'
            });
        }
        else {
            return res.status(StatusCode.OK).json({
                message: 'User successfully authenticated',
                user: req.user
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { googleCallback };