const express = require('express');
const authService = require('../services/auth.service');
const StatusCode = require('../utils/objects/statusCode.object');

const authUtils = require('../utils/functions/auth.util');

const userRegistration = async (req, res, next) => {
    try {
        const newUser = req.body;

        const user = await authService.userRegistration(newUser);

        res.status(StatusCode.CREATED).json({
            message: `Profile for ${user.name} with username ${user.username} created successfully`
        });

    } catch (error) {
        next(error);
    }
}

const userLogin = async (req, res, next) => {
    try {
        const loginCredentials = req.body;

        const token = await authService.userLogin(loginCredentials);

        const access_token = token;
        authUtils.setTokenToHeader(token, res);

        res.status(StatusCode.OK).json({
            message: 'Log in Successful',
            access_token
        })

    } catch (error) {
        next(error);
    }
}

module.exports = {
    userRegistration,
    userLogin
}