/**
 * User routes module.
 * @module Repositories/User
 * @description Routes for handling user related requests
 */

const express = require('express');
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.route.validator');
const validationCheck = require('../middlewares/validation.middleware');

/**
 * Router for handling user related requests.
 * @type {object}
 * @const
 * @namespace userRouter
 */
const userRouter = express.Router();

/**
 * Route for getting all users.
 * @name GET/api/users/
 * @function
 * @memberof userRouter
 * @inner
 * @param {number} req.query.offset - The offset of the query.
 * @param {number} req.query.limit - The limit of the query.
 * @returns {object} - The result object containing the users and the total count.
 */
userRouter.get('/', userController.getAllUser);

userRouter.route('/:username')
    /**
     * Route for getting a user by username.
     * @name GET/api/users/:username
     * @function
     * @memberof userRouter
     * @inner
     * @param {string} req.params.username - The username of the user to retrieve.
     * @returns {object} - The user object.
     * @throws {NotFoundError} - If no user is found with the given username.
     */
    .get(userValidator.getUserParamValidator, validationCheck, userController.getUserByUsername)

    /**
     * Route for updating a user by username.
     * @name PUT/api/users/:username
     * @function
     * @memberof userRouter
     * @inner
     * @param {string} req.params.username - The username of the user to update.
     * @param {object} req.body - The updated user fields.
     * @returns {object} - The updated user object.
     * @throws {NotFoundError} - If no user is found with the given username.
     * @throws {ValidationError} - If the update fields are invalid.
     */
    .put(userValidator.updateUserValidator, validationCheck, userController.updateUser)

    /**
     * Route for deleting a user by username.
     * @name DELETE/api/users/:username
     * @function
     * @memberof userRouter
     * @inner
     * @param {string} req.params.username - The username of the user to delete.
     * @throws {NotFoundError} - If no user is found with the given username.
     */
    .delete(userController.deleteUser);

module.exports = userRouter;
