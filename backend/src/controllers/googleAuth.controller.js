const express = require('express');
const { StatusCode } = require('../utils/commonObject.util');
const oAuthService = require('../services/googleAuth.service');
const convertData = require('../utils/convertData.util');

const oauthCallBack = async (req, res, next) => {
    try {
        const token = await oAuthService.oauthCallBack(req, res);

        const convertedData = convertData({
            access_token: token
        }, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

const oauthCallBackFailed = async (req, res, next) => {
    try {
        const convertedData = convertData({
            message: "request failed",
        }, req.requestedFormat)

        res.status(StatusCode.UNAUTHORIZED).send(convertedData);
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    oauthCallBack,
    oauthCallBackFailed
};