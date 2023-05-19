const {
    getAllBlogs,
    postBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getBlogsByAuthorUsername,
} = require('../../../services/blog.service');

const blogRepository = require('../../../repositories/blog.repository');
const userRepository = require('../../../repositories/user.repository');

const { BlogDto } = require('../../../dto/response/blog.res.dto');
const { StatusCode, HttpError } = require('../../../utils/commonObject.util');
const paginationUtils = require('../../../utils/pagination.util');
const { v4: uuidv4 } = require('uuid');

jest.mock('../../../repositories/blog.repository');
jest.mock('../../../repositories/user.repository');
jest.mock('../../../dto/response/blog.res.dto');
// jest.mock('../../../utils/pagination.util');

paginationUtils.pagination = jest.fn(({ page, limit }) => {

    page = parseInt(page) > 0 ? parseInt(page) : 1;
    limit = parseInt(limit) > 0 ? parseInt(limit) : 10;

    const offset = (page - 1) * limit;

    return {
        offset,
        limit,
    };
});
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-blogid'),
}));

describe('Blog Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBlogs', () => {
        test('should return blogs, currentPage, totalPages, and totalBlogs when there are blogs', async () => {
            const paginationParameter = { page: 1, limit: 10 };
            const offset = 0;
            const limit = 10;
            const count = 5;

            const blogs = [
                { id: 1, name: 'mahmud', title: 'Blog 1', content: 'Blog 1 content' },
                { id: 1, name: 'mahmud', title: 'Blog 1', content: 'Blog 1 content' }
            ];

            const expectedResponse = {
                blogs: blogs.map((blog) => new BlogDto(blog)),
                currentPage: 1,
                totalPages: 1,
                totalBlogs: count,
            };

            paginationUtils.pagination.mockReturnValue({ offset, limit });
            paginationUtils.currentPage = jest.fn().mockReturnValue(1);
            paginationUtils.totalPages = jest.fn().mockReturnValue(1);
            blogRepository.getAllBlogs.mockResolvedValue({ count, rows: blogs });

            const response = await getAllBlogs(paginationParameter);

            expect(blogRepository.getAllBlogs).toHaveBeenCalledWith(offset, limit);
            expect(response
            ).toEqual(expectedResponse);
        });

        test('should return an empty array when there are no blogs', async () => {
            const paginationParameter = { page: 5, limit: 10 };
            const offset = 0;
            const limit = 10;
            const count = 0;
            const expectedResponse = []

            blogRepository.getAllBlogs.mockResolvedValue({ count, rows: [] });
            const response = await getAllBlogs(paginationParameter);

            expect(blogRepository.getAllBlogs).toHaveBeenCalledWith(offset, limit);
            expect(response).toEqual(expectedResponse);
        });

    });

    test('should create and return a new blog', async () => {
        const blogPostReqDto = {
            title: 'Test Blog',
            content: 'This is a test blog.',
            userid: 'user-id',
        };

        const expectedBlog = {
            blogid: 'mocked-blogid',
            userid: 'user-id',
            title: 'Test Blog',
            content: 'This is a test blog.'
        };

        const mockedBlog = {
            blogid: 'mocked-blogid',
            userid: 'user-id',
            title: 'Test Blog',
            content: 'This is a test blog.',
            createdAt: '2023-05-15T12:00:00Z',
            updatedAt: '2023-05-15T12:00:00Z',
        };

        blogRepository.postBlog.mockResolvedValue(mockedBlog);

        const result = await postBlog(blogPostReqDto);

        expect(blogRepository.postBlog).toHaveBeenCalledWith(expectedBlog);
        expect(result).toEqual(new BlogDto(mockedBlog));
    });

    describe('getBlogById', () => {
        test('should retrieve and return a blog when it exists', async () => {
            const blogid = 'existing-blog-id';
            const existingBlog = {
                blogid: 'existing-blog-id',
                title: 'Test Blog',
                content: 'This is a test blog.',
                userid: 'user-id',
                createdAt: '2023-05-15T12:00:00Z',
                updatedAt: '2023-05-15T12:00:00Z',
            };

            blogRepository.getBlogById.mockResolvedValue(existingBlog);

            const result = await getBlogById(blogid);

            expect(blogRepository.getBlogById).toHaveBeenCalledWith(blogid);
            expect(result).toEqual(new BlogDto(existingBlog));
        });

        test('should throw an error when the blog does not exist', async () => {
            const blogid = 'non-existing-blog-id';

            blogRepository.getBlogById.mockResolvedValue(null);

            await expect(getBlogById(blogid)).rejects.toThrow(
                new HttpError(StatusCode.NOT_FOUND, 'blog not found')
            );
        });

        test('should throw an error when the user is not authorized to update the blog', async () => {
            const blogUpdateReqDto = {
                blogid: 'blog1',
                userid: 'user1',
            };

            const blog = {
                blogid: 'blog1',
                userid: 'user2',
            };

            blogRepository.getBlogById.mockResolvedValue(blog);

            await expect(updateBlogById(blogUpdateReqDto)).rejects.toThrow(
                new HttpError(StatusCode.FORBIDDEN, 'You are not authorized to update this blog')
            );
        });



    })

    describe('updateBlogById', () => {
        test('should successfully update and return the blog when it exists and the user is authorized', async () => {
            const blogUpdateReqDto = {
                blogid: 'existing-blog-id',
                userid: 'user-id',
                title: 'Updated Blog',
                content: 'This is an updated blog.',
            };

            const existingBlog = {
                blogid: 'existing-blog-id',
                title: 'Test Blog',
                content: 'This is a test blog.',
                userid: 'user-id',
                createdAt: '2023-05-15T12:00:00Z',
                updatedAt: '2023-05-15T12:00:00Z',
            };

            const updatedBlog = {
                blogid: 'existing-blog-id',
                title: 'Updated Blog',
                content: 'This is an updated blog.',
                userid: 'user-id',
                createdAt: '2023-05-15T12:00:00Z',
                updatedAt: '2023-05-16T10:00:00Z',
            };

            blogRepository.getBlogById.mockResolvedValue(existingBlog);
            blogRepository.updateBlogById.mockResolvedValue(updatedBlog);

            const result = await updateBlogById(blogUpdateReqDto);

            expect(blogRepository.getBlogById).toHaveBeenCalledWith(blogUpdateReqDto.blogid);
            expect(blogRepository.updateBlogById).toHaveBeenCalledWith(existingBlog, blogUpdateReqDto);
            expect(result).toEqual(new BlogDto(updatedBlog));
        });
        test('should throw an error when the blog does not exist', async () => {
            const blogUpdateReqDto = {
                blogid: 'non-existing-blog-id',
                userid: 'user-id',
                title: 'Updated Blog',
                content: 'This is an updated blog.',
            };

            blogRepository.getBlogById.mockResolvedValue(null);

            await expect(updateBlogById(blogUpdateReqDto)).rejects.toThrow(
                new HttpError(StatusCode.NOT_FOUND, 'Blog not found')
            );
        });

    });

    describe('deleteBlogById', () => {
        test('should successfully delete the blog when it exists and the user is authorized', async () => {
            const userid = 'user-id';
            const blogid = 'existing-blog-id';

            const existingBlog = {
                blogid: 'existing-blog-id',
                title: 'Test Blog',
                content: 'This is a test blog.',
                userid: 'user-id',
                createdAt: '2023-05-15T12:00:00Z',
                updatedAt: '2023-05-15T12:00:00Z',
            };

            blogRepository.getBlogById.mockResolvedValue(existingBlog);
            blogRepository.deleteBlogById.mockResolvedValue({ success: true });

            const result = await deleteBlogById(userid, blogid);

            expect(blogRepository.getBlogById).toHaveBeenCalledWith(blogid);
            expect(blogRepository.deleteBlogById).toHaveBeenCalledWith(existingBlog);
            expect(result).toEqual({ success: true });
        });
        test('should throw an error when the blog does not exist', async () => {
            const userid = 'user-id';
            const blogid = 'non-existing-blog-id';

            blogRepository.getBlogById.mockResolvedValue(null);

            await expect(deleteBlogById(userid, blogid)).rejects.toThrow(
                new HttpError(StatusCode.NOT_FOUND, 'Blog not found')
            );
        });
        test('deleteBlogById should throw an error if the requesting user is not authorized to delete the blog', async () => {
            const blogId = 'blog-123';
            const userId = 'user-456';

            const blog = {
                blogid: blogId,
                userid: 'user-789',
            };
            blogRepository.getBlogById.mockResolvedValue(blog);

            expect(userId).not.toBe(blog.userid);

            await expect(() => deleteBlogById(userId, blogId)).rejects.toThrow(HttpError);
        });

    });

    describe('getBlogsByAuthorUsername', () => {
        test('should return blogs, currentPage, totalPages, and totalBlogs when the user exists and there are blogs', async () => {
            const username = 'testuser';
            const paginationParameter = {
                page: 1,
                limit: 10,
            };

            const existingUser = {
                username: 'testuser',
                name: 'Test User',
            };

            const blogs = [
                {
                    blogid: 'blog1',
                    title: 'Blog 1',
                    content: 'This is Blog 1',
                },
                {
                    blogid: 'blog2',
                    title: 'Blog 2',
                    content: 'This is Blog 2',
                },
            ];

            const count = 2;

            userRepository.getUserByUsername.mockResolvedValue(existingUser);
            blogRepository.getBlogsByAuthorUsername.mockResolvedValue({ count, rows: blogs });

            const result = await getBlogsByAuthorUsername(username, paginationParameter);

            const expectedResponse = {
                blogs: blogs.map((blog) => new BlogDto(blog)),
                currentPage: 1,
                totalPages: 1,
                totalBlogs: count,
            };

            expect(userRepository.getUserByUsername).toHaveBeenCalledWith(username);
            expect(blogRepository.getBlogsByAuthorUsername).toHaveBeenCalledWith(username, 0, 10);
            expect(result).toEqual(expectedResponse);
        });
        test('should throw an error when the user does not exist', async () => {
            const username = 'nonexistinguser';
            const paginationParameter = {
                page: 1,
                limit: 10,
            };

            userRepository.getUserByUsername.mockResolvedValue(null);

            await expect(getBlogsByAuthorUsername(username, paginationParameter)).rejects.toThrow(
                new HttpError(StatusCode.NOT_FOUND, 'User not found')
            );
        });

        test('getBlogsByAuthorUsername should return an empty array if no blogs are found for the author', async () => {

            userRepository.getUserByUsername.mockResolvedValueOnce({ username: 'john' });


            blogRepository.getBlogsByAuthorUsername.mockResolvedValueOnce({ count: 0, rows: [] });

            const username = 'john';
            const paginationParameter = { page: 1, limit: 10 };

            const result = await getBlogsByAuthorUsername(username, paginationParameter);

            expect(userRepository.getUserByUsername).toHaveBeenCalledWith(username);
            expect(blogRepository.getBlogsByAuthorUsername).toHaveBeenCalledWith(username, 0, 10);
            expect(result).toEqual([]);
        });


    });

});