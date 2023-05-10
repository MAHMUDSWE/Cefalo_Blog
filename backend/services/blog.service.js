const blogRepository = require("../respositories/blog.repository");
const userRepository = require("../respositories/user.repository");

const { v4: uuidv4 } = require('uuid');

const { BlogDto } = require("../dto/response/blog.res.dto");
const { StatusCode, HttpError } = require('../utils/commonObject.util');
const paginationUtils = require('../utils/pagination.util');

const getAllBlogs = async (paginationParameter) => {

    const { offset, limit } = paginationUtils.pagination(paginationParameter);
    const { count, rows } = await blogRepository.getAllBlogs(offset, limit);

    if (!rows[0]) {
        return rows;
    }

    return {
        blogs: rows.map((blog) => new BlogDto(blog)),
        currentPage: paginationUtils.currentPage(offset, limit),
        totalPages: paginationUtils.totalPages(count, limit),
        totalBlogs: count
    };
}

const postBlog = async (blogPostReqDto) => {

    const newBlog = {
        blogid: uuidv4(),
        ...blogPostReqDto
    }

    const blog = await blogRepository.postBlog(newBlog);

    return new BlogDto(blog);
}

const getBlogById = async (blogid) => {
    const blog = await blogRepository.getBlogById(blogid);

    if (!blog) {
        throw new HttpError(StatusCode.NOT_FOUND, "blog not found");
    }

    return new BlogDto(blog);
}

const updateBlogById = async (blogUpdateReqDto) => {

    const { blogid, userid } = blogUpdateReqDto;

    const blog = await blogRepository.getBlogById(blogid);

    if (!blog) {
        throw new HttpError(StatusCode.NOT_FOUND, 'Blog not found');
    }

    if (blog.userid !== userid) {
        throw new HttpError(StatusCode.FORBIDDEN, 'You are not authorized to update this blog')
    };

    const updatedBlog = await blogRepository.updateBlogById(blog, blogUpdateReqDto);

    return new BlogDto(updatedBlog);
}


const deleteBlogById = async (userid, blogid) => {
    const blog = await blogRepository.getBlogById(blogid);

    if (!blog) {
        throw new HttpError(StatusCode.NOT_FOUND, 'Blog not found');
    }

    if (blog.userid !== userid) {
        throw new HttpError(StatusCode.FORBIDDEN, 'You are not authorized to delete this blog')
    };
    const result = await blogRepository.deleteBlogById(blog);

    return result;
}


const getBlogsByAuthorUsername = async (username, paginationParameter) => {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, "User not found");
    }

    const { offset, limit } = paginationUtils.pagination(paginationParameter);

    const { count, rows } = await blogRepository.getBlogsByAuthorUserId(user.userid, offset, limit);

    if (!rows[0]) {
        return rows;
    }

    return {
        blogs: rows.map((blog) => new BlogDto(blog)),
        currentPage: paginationUtils.currentPage(offset, limit),
        totalPages: paginationUtils.totalPages(count, limit),
        totalBlogs: count
    };
}

module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername
}