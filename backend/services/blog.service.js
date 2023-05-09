const blogRepository = require("../respositories/blog.repository");
const userRepository = require("../respositories/user.repository");

const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/objects/httpError.object");
const StatusCode = require("../utils/objects/statusCode.object");
const { BlogDto } = require("../dto/response/blog.res.dto");

const getAllBlogs = async () => {
    const blogs = await blogRepository.getAllBlogs();

    if (!blogs[0]) {
        return blogs;
    }

    return blogs.map((blog) => new BlogDto(blog));
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


const getBlogsByAuthorUsername = async (username) => {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, "User not found");
    }

    const blogs = await blogRepository.getBlogsByAuthorUserId(user.userid);

    if (!blogs[0]) {
        return blogs;
    }
    return blogs.map((blog) => new BlogDto(blog));
}

module.exports = {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername
}