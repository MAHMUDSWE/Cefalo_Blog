const { body } = require('express-validator');

const updateUserValidator = [
    body('name').trim().optional().notEmpty().withMessage('Name field can not be empty'),

    body('email').trim().optional().isEmail().withMessage('Invalid email address').normalizeEmail(),

    body('username').trim().optional()
        .notEmpty().withMessage('Username is required')
        .if(body('username').notEmpty())
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),

    body('password').trim().optional()
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters')
];

module.exports = { updateUserValidator };
