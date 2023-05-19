const Blog = require('../models/blog.model');
const User = require('../models/user.model');

const getAllBlogs = async (offset, limit) => {
    const result = await Blog.findAndCountAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return result;
}

const postBlog = async (newBlog) => {
    const { blogid, userid, title, content, status } = newBlog;

    const blog = await Blog.create({
        blogid, userid, title, content, status
    });

    await blog.reload({
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return blog;
}

const getBlogById = async (blogid) => {
    const blog = await Blog.findOne({
        where: { blogid },
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return blog;
}

const updateBlogById = async (blog, blogUpdateReqDto) => {
    const { title, content, status } = blogUpdateReqDto;
    return await blog.update({ title, content, status });
}

const deleteBlogById = async (blog) => {

    return await blog.destroy();
}

const getBlogsByAuthorUsername = async (username, offset, limit) => {
    const result = await Blog.findAndCountAll({
        where: { '$user.username$': username },
        offset,
        limit,
        order: [['createdAt', 'DESC']],
        include: [{
            model: User,
            as: 'user',
            attributes: ['name', 'username']
        }]
    });

    return result;
};


module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername
}