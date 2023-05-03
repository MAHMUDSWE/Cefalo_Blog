const express = require('express');
const authService = require('../services/auth.service');
const StatusCode = require('../utils/objects/statusCode.object')

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

const userLogin = (req, res) => {
    res.send("controller for user log in");
}

module.exports = {
    userRegistration,
    userLogin
}