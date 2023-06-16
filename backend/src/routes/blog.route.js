const express = require('express');
const blogController = require('../controllers/blog.controller');
const blogValidator = require('../validators/blog.route.validator');
const validationCheck = require('../middlewares/validation.middleware');

/**
 * Blog routes module.
 * @module Repositories/Blog
 * @description Routes for handling auth related requests
 */

const router = express();


router.route('/')
    /**
     * @name GET /blogs
     * @function
     * @memberof module:Repositories/Blog
     * @description Get all blogs
     * @param {Request} req - Express Request object
     * @param {Response} res - Express Response object
     */
    .get(blogController.getAllBlogs)
    /**
     * @name POST /blogs
     * @function
     * @memberof module:Repositories/Blog
     * @description Create a new blog
     * @param {Request} req - Express Request object
     * @param {Response} res - Express Response object
     */
    .post(blogValidator.blogPostValidator, validationCheck, blogController.postBlog);


router.route('/:blogid')
    /**
     * @name GET /blogs/:blogid
     * @function
     * @memberof module:Repositories/Blog
     * @description Get a blog by ID
     * @param {Request} req - Express Request object
     * @param {Response} res - Express Response object
     */
    .get(blogController.getBlogById)
    /**
     * @name PUT /blogs/:blogid
     * @function
     * @memberof module:Repositories/Blog
     * @description Update a blog by ID
     * @param {Request} req - Express Request object
     * @param {Response} res - Express Response object
     */
    .put(blogValidator.blogPostValidator, validationCheck, blogController.updateBlogById)
    /**
     * @name DELETE /blogs/:blogid
     * @function
     * @memberof module:Repositories/Blog
     * @description Delete a blog by ID
     * @param {Request} req - Express Request object
     * @param {Response} res - Express Response object
     */
    .delete(blogController.deleteBlogById);


/**
 * @name GET /blogs/author/:username
 * @function
 * @memberof module:Repositories/Blog
 * @description Get all blogs by author username
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
router.get('/author/:username', blogController.getBlogsByAuthorUsername);

router.get('/search/:query', blogController.getSearchResults);

module.exports = router;
