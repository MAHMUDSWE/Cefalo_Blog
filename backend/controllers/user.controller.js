const express = require('express');
const userService = require('../services/user.service');

const HttpError = require("../utils/objects/httpError.object")
const StatusCode = require("../utils/objects/statusCode.object")


const getAllUser = async (req, res, next) => {
    try {
        const users = await userService.getAllUser();

        if (!users) {
            throw new HttpError(StatusCode.NOT_FOUND, "No user is registered");
        }

        res.status(StatusCode.OK).json({
            users
        })
    } catch (error) {
        next(error);
    }
}

const getUserByUsername = async (req, res, next) => {


    try {
        const { username } = req.params;

        if (!username) {
            throw new HttpError(StatusCode.BAD_REQUEST, "Request parameter is empty");
        }

        const user = await userService.getUserByUsername(username, next);

        if (!user) {
            console.log("inside");
            throw new HttpError(StatusCode.NOT_FOUND, "User not found");
        }
        return res.status(StatusCode.OK).json({
            user
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { userid } = req;
        const updateFields = req.body;

        if (!Object.keys(updateFields).length) {
            throw new HttpError(StatusCode.BAD_REQUEST, "Update field is empty");
        }

        const result = await userService.updateUser(userid, updateFields);

        if (result[0]) {
            res.status(StatusCode.OK).json({
                message: `User with id ${req.userid} has been updated successfully`,
            })
        }

    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { userid } = req;

        const result = await userService.deleteUser(userid);

        if (result) {
            res.status(StatusCode.OK).json({
                message: `User with id ${req.userid} has been deleted successfully`,
            })
        }
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

