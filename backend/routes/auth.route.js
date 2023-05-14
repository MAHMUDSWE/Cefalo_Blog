const express = require('express');
const authValidator = require('../validators/auth.route.validator');
const validationCheck = require('../middlewares/validation.middleware');
const authController = require("../controllers/auth.controller");
/**
 * Auth routes module.
 * @module Repositories/Auth
 * @description Routes for handling auth related requests
 */

/**
 * Express router instance for the auth routes.
 * @typedef {import('express').Router} Router
 */

/**
 * The auth router instance.
 * @type {Router}
 */
const router = express();

/**
 * Route for user signup.
 *
 * @name POST /signup
 * @function
 * @memberof module:routers/authRouter
 * @inner
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body object containing user data.
 * @param {string} req.body.username - User's username.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 *
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {Promise<void>} Nothing is returned from this function.
 */
router.post('/signup', authValidator.signup, validationCheck, authController.userRegistration);

/**
 * Route for user login.
 *
 * @name POST /login
 * @function
 * @memberof module:routers/authRouter
 * @inner
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body object containing user data.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 *
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {Promise<void>} Nothing is returned from this function.
 */
router.post('/login', authValidator.login, validationCheck, authController.userLogin);

module.exports = router;
