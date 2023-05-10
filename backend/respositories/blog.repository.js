const Blog = require('../models/blog.model');

const getAllBlogs = async (offset, limit) => {
    const result = await Blog.findAndCountAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
    });

    return result;
}

const postBlog = async (newBlog) => {
    const { blogid, userid, title, content, status } = newBlog;

    const blog = await Blog.create({
        blogid, userid, title, content, status
    });

    return blog;
}
const getBlogById = async (blogid) => {
    const blog = await Blog.findOne({ where: { blogid } });

    return blog;
}

const updateBlogById = async (blog, blogUpdateReqDto) => {
    const { title, content, status } = blogUpdateReqDto;
    return await blog.update({ title, content, status });
}

const deleteBlogById = async (blog) => {

    return await blog.destroy();
}

const getBlogsByAuthorUserId = async (userid, offset, limit) => {

    const result = await Blog.findAndCountAll({
        where: { userid },
        offset,
        limit,
        order: [['createdAt', 'DESC']],
    });

    return result;
};

module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUserId
}