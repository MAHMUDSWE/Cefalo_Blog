const express = require('express');
const authService = require('../services/auth.service');

const authUtils = require("../utils/auth.util")
const { SignupReqDTO } = require('../dto/request/signup.req.dto');
const { StatusCode } = require('../utils/commonObject.util');

const userRegistration = async (req, res, next) => {
    try {
        const { name, email, username, password, confirmPassword } = req.body

        const signupReqDto = new SignupReqDTO({ name, email, username, password, confirmPassword })

        const user = await authService.userRegistration(signupReqDto);

        res.status(StatusCode.CREATED).json({
            message: `Profile for ${user.name} with username ${user.username} created successfully`,
            user
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