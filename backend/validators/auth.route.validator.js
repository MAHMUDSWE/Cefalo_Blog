const { body } = require('express-validator');
const HttpError = require('../utils/objects/httpError.object');
const StatusCode = require('../utils/objects/statusCode.object');

const signup = [

    body('name').trim().not()
        .isEmpty().withMessage('Name is required'),

    body('email').trim().not()
        .isEmpty().withMessage('Email is required')
        .if(body('email').notEmpty())
        .isEmail().withMessage('Invalid email address').normalizeEmail(),

    body('username').trim().not()
        .isEmpty().withMessage('Username is required')
        .if(body('username').notEmpty())
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),

    body('password')
        .trim().not()
        .isEmpty().withMessage('Password is required')
        .if(body('password').notEmpty())
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),

    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new HttpError(StatusCode.BAD_REQUEST, 'Passwords do not match');
        }
        return true;
    }).optional()

];

const login = [
    body('username').trim().not()
        .isEmpty().withMessage('Username is required')
        .if(body('username').notEmpty())
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),

    body('password')
        .trim().not()
        .isEmpty().withMessage('Password is required')
        .if(body('password').notEmpty())
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters')
]

module.exports = { signup, login };