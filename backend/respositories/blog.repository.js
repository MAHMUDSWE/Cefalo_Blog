const { BlogDto } = require('../dto/response/blog.res.dto');
const Blog = require('../models/blog.model');
const User = require('../models/user.model');

const getAllBlogs = async () => {
    const blogs = await Blog.findAll();

    // if (!blogs[0]) {
    //     return null;
    // }
    return blogs;
}

const postBlog = async (newBlog) => {
    const { blogid, userid, title, content } = newBlog;

    var blog = await Blog.create({
        blogid, userid, title, content
    });

    return blog;
}
const getBlogById = async (blogid) => {
    var blog = await Blog.findOne({ where: { blogid } });

    if (!blog) {
        return null;
    }

    return blog;
}

const updateBlogById = async (blog, title, content) => {

    return await blog.update({ title, content });

}

const deleteBlogById = async (blog) => {

    return await blog.destroy();
}

const getBlogsByAuthorUsername = async (userid) => {

    const blogs = await Blog.findAll({
        where: { userid }
    });

    if (!blogs[0]) {
        return null;
    }
    return blogs;
};

module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername
}