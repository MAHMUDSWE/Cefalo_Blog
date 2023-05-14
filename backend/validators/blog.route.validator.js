/**
 * User route validators module.
 * @module Validators/blog.route.validator
 */

/**
 * Validator for blog post data.
 * @typedef {Object} BlogPostValidator
 * @property {Function} title - Validates the title of the blog post.
 * @property {Function} content - Validates the content of the blog post.
 */

const { body } = require('express-validator');

/**
 * Validator for blog post data.
 * @type {BlogPostValidator}
 */
const blogPostValidator = [
    body('title')
        .trim().not()
        .isEmpty().withMessage('Title is required')
        .if(body('title').notEmpty())
        .isLength({ max: 50 }).withMessage('Content must be at most 50 characters'),

    body('content')
        .trim().not()
        .isEmpty().withMessage('Content is required')
        .if(body('content').notEmpty())
        .isLength({ max: 1000 }).withMessage('Content must be at most 1000 characters')
];

module.exports = {
    blogPostValidator
};
