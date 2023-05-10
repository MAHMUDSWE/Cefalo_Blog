const express = require('express');
const userService = require('../services/user.service');
const { StatusCode } = require('../utils/commonObject.util');


const getAllUser = async (req, res, next) => {
    try {

        const paginationParameter = req.query;

        const data = await userService.getAllUser(paginationParameter);

        res.status(StatusCode.OK).json({
            data
        })
    } catch (error) {
        next(error);
    }
}

const getUserByUsername = async (req, res, next) => {

    try {
        const { username } = req.params;

        const user = await userService.getUserByUsername(username);

        return res.status(StatusCode.OK).json({
            user
        });

    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { userid } = req;
        const updateFields = req.body;

        const updatedUser = await userService.updateUser(userid, updateFields);

        res.status(StatusCode.OK).json({
            message: `User with id ${req.userid} has been updated successfully`,
            updatedUser
        })


    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { userid } = req;

        await userService.deleteUser(userid);

        res.status(StatusCode.OK).json({
            message: `User with id ${req.userid} has been deleted successfully`,
        })

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

