const express = require('express');
const authService = require('../services/auth.service');

const authUtils = require("../utils/auth.util")
const { SignupReqDTO } = require('../dto/request/signup.req.dto');
const { StatusCode } = require('../utils/commonObject.util');
const convertData = require('../utils/converData.util');

const userRegistration = async (req, res, next) => {
    try {
        const { name, email, username, password, confirmPassword } = req.body

        const signupReqDto = new SignupReqDTO({ name, email, username, password, confirmPassword })

        const user = await authService.userRegistration(signupReqDto);

        const convertedData = convertData({
            message: `Profile for ${user.name} with username ${user.username} created successfully`,
            user
        }, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

const userLogin = async (req, res, next) => {
    try {
        const loginCredentials = req.body;

        const token = await authService.userLogin(res, loginCredentials);

        const convertedData = convertData({
            access_token: token
        }, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    userRegistration,
    userLogin
}