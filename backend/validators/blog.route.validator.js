const { body } = require('express-validator');

const blogPostValidator = [
    body('title')
        .trim()
        .not().isEmpty().withMessage('Title is required')
        .if(body('title').notEmpty())
        .isLength({ max: 50 })
        .withMessage('Content must be at most 50 characters'),

    body('content')
        .trim()
        .not().isEmpty().withMessage('Content is required')
        .isLength({ max: 1000 })
        .withMessage('Content must be at most 1000 characters')

];

module.exports = {
    blogPostValidator
};
