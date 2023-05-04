const { body } = require('express-validator');

const signup = [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('username').trim().not()
        .isEmpty().withMessage('Username is required')
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters')
];

const login = [
    body('username').trim().not()
        .isEmpty().withMessage('Username is required')
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters')
]

module.exports = { signup, login };