const express = require('express');
const router = express();

const blogController = require('../controllers/blog.controller');

router.route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.postBlog);

router.route('/:id')
    .get(blogController.getBlogById)
    .put(blogController.updateBlogById)
    .delete(blogController.deleteBlogById);

router.get('/author/:username', blogController.getBlogsByAuthorUsername);

module.exports = router;