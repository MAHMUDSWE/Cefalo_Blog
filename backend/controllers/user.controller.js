const express = require('express');
const userService = require('../services/user.service');
const { StatusCode } = require('../utils/commonObject.util');
const convertData = require('../utils/convertData.util');


const getAllUser = async (req, res, next) => {
    try {

        const paginationParameter = req.query;

        const users = await userService.getAllUser(paginationParameter);

        const convertedData = convertData(users, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);
    } catch (error) {
        next(error);
    }
}

const getUserByUsername = async (req, res, next) => {

    try {
        const { username } = req.params;

        const user = await userService.getUserByUsername(username);

        const convertedData = convertData(user, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { userid } = req;
        const updateFields = req.body;

        const updatedUser = await userService.updateUser(userid, updateFields);

        const convertedData = convertData(updatedUser, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);


    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { userid } = req;

        await userService.deleteUser(userid);

        const convertedData = convertData({
            message: `User with id ${req.userid} has been deleted successfully`,
        }, req.requestedFormat)

        res.status(StatusCode.OK).send(convertedData);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUser,
    getUserByUsername,
    updateUser,
    deleteUser
};

