/**
 * User route validators module.
 * @module Validators/blog.route.validator
 */

const { body, ValidationChain } = require('express-validator');

/**
 * Validator for blog post data.
 * @type {ValidationChain[]} 
 */
const blogPostValidator = [
    body('title')
        .trim().not()
        .isEmpty().withMessage('Title is required')
        .if(body('title').notEmpty())
        .isLength({ max: 200 }).withMessage('Title must be at most 200 characters'),

    body('content')
        .trim().not()
        .isEmpty().withMessage('Content is required')
        .if(body('content').notEmpty())
        .isLength({ max: 20000 }).withMessage('Content must be at most 20000 characters')
];

module.exports = {
    blogPostValidator
};
