const express = require('express');
const router = express();

const blogController = require('../controllers/blog.controller');
const blogValidator = require('../validators/blog.route.validator');
const validationCheck = require('../middlewares/validation.middleware');

router.route('/')
    .get(blogController.getAllBlogs)
    .post(blogValidator.blogPostValidator, validationCheck, blogController.postBlog);

router.route('/:blogid')
    .get(blogController.getBlogById)
    .put(blogValidator.blogPostValidator, validationCheck, blogController.updateBlogById)
    .delete(blogController.deleteBlogById);

router.get('/author/:username', blogController.getBlogsByAuthorUsername);

module.exports = router;