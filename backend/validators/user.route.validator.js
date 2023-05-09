const { body, check } = require('express-validator');
const { StatusCode } = require('../utils/commonObject.util');

const updateUserValidator = [
    body('name').trim().not()
        .optional()
        .notEmpty().withMessage('Name field can not be empty'),

    body('email').trim().not()
        .optional()
        .isEmpty().withMessage('Email is required')
        .if(body('email').notEmpty())
        .isEmail().withMessage('Invalid email address').normalizeEmail(),

    body('username').trim().not()
        .optional()
        .notEmpty().withMessage('Username is required')
        .if(body('username').notEmpty())
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),

    body('password')
        .trim().not()
        .optional()
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

const getUserParamValidator = [
    check('username')
        .isLength({ min: 4 })
        .withMessage('Username must be at least 4 characters long')
]

module.exports = {
    updateUserValidator,
    getUserParamValidator
};
