/**
 * User controller module.
 * @module Controllers/User
 * @description Controller functions for handling user related operations
 */

const express = require('express');
const userService = require('../services/user.service');
const { StatusCode } = require('../utils/commonObject.util');
const convertData = require('../utils/convertData.util');


/**
 * Get all users based on pagination parameter
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - The response object containing the list of users
 * @throws {Error} - If there is an error while retrieving the list of users
 */

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

/**
 * Get a user by username
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - The response object containing the user data
 * @throws {Error} - If there is an error while retrieving the user data
 */

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

/**
 * Update a user's data
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - The response object containing the updated user data
 * @throws {Error} - If there is an error while updating the user data
 */

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

/**
 * Delete a user by their ID
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - The response object containing a success message
 * @throws {Error} - If there is an error while deleting the user
 */

const deleteUser = async (req, res, next) => {
    try {
        const { userid } = req;

        await userService.deleteUser(userid);

        const convertedData = convertData({
            message: `User with id ${userid} has been deleted successfully`,
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

