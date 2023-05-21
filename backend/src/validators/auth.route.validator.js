/**
 * User route validators module.
 * @module Validators/user.route.validator
 */

const { body, ValidationChain } = require('express-validator');
const { StatusCode, HttpError } = require('../utils/commonObject.util');

/**
 * Validation rules for user signup.
 * @type {ValidationChain[]}
 */
const signup = [

    body('name')
        .trim()
        .not()
        .optional()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 30 })
        .withMessage('Name must be at max 30 characters'),

    body('email')
        .trim()
        .not()
        .optional()
        .isEmpty()
        .withMessage('Email is required')
        .if(body('email').notEmpty())
        .isEmail()
        .withMessage('Invalid email address')
        .normalizeEmail(),

    body('username')
        .trim()
        .not()
        .optional()
        .notEmpty()
        .withMessage('Username is required')
        .if(body('username').notEmpty())
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters')
        .isLength({ max: 20 })
        .withMessage('Username must be at max 20 characters'),

    body('password')
        .trim()
        .not()
        .optional()
        .isEmpty()
        .withMessage('Password is required')
        .if(body('password').notEmpty())
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters')
        .isLength({ max: 20 })
        .withMessage('Password must be at max 20 characters'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new HttpError(
                    StatusCode.BAD_REQUEST,
                    'Passwords do not match'
                );
            }
            return true;
        })
        .optional(),

];

/**
 * Validation rules for user login.
 * @type {ValidationChain[]}
 */
const login = [
    body('username').trim().not()
        .isEmpty().withMessage('Username is required')
        .if(body('username').notEmpty())
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters')
        .isLength({ max: 20 })
        .withMessage('Username must be at max 20 characters'),

    body('password')
        .trim().not()
        .isEmpty().withMessage('Password is required')
        .if(body('password').notEmpty())
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters')
        .isLength({ max: 20 })
        .withMessage('Password must be at max 20 characters')
];

module.exports = { signup, login };
