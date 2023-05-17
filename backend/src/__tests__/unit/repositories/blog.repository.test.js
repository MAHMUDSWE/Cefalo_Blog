const BlogRepository = require('../../../repositories/blog.repository');
const Blog = require('../../../models/blog.model');
const User = require('../../../models/user.model');

jest.mock('../../../models/blog.model');
jest.mock('../../../models/user.model');

describe('Blog Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBlogs', () => {
        it('should return all blogs with their respective author details', async () => {
            // Arrange
            const offset = 0;
            const limit = 10;
            const expectedBlogs = [{ id: 1, title: 'Blog 1' }, { id: 2, title: 'Blog 2' }];
            const expectedResult = {
                rows: expectedBlogs,
                count: expectedBlogs.length,
            };
            Blog.findAndCountAll.mockResolvedValue(expectedResult);

            // Act
            const result = await BlogRepository.getAllBlogs(offset, limit);

            // Assert
            expect(Blog.findAndCountAll).toHaveBeenCalledWith({
                offset,
                limit,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name', 'username']
                }]
            });
            expect(result).toEqual(expectedResult);
        });
    });

    describe('postBlog', () => {
        const newBlog = {
            blogid: '123',
            userid: '456',
            title: 'New Blog',
            content: 'Blog content',
            status: 'published',
        };

        const expectedBlog = {
            blogid: '123',
            userid: '456',
            title: 'New Blog',
            content: 'Blog content',
            status: 'published',
            reload: jest.fn().mockResolvedValueOnce({
                ...newBlog,
                user: {
                    name: 'John Doe',
                    username: 'johndoe',
                },
            }),
        };

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should create a new blog and include user details', async () => {
            // Mock the Blog.create method
            Blog.create.mockResolvedValue(expectedBlog);

            // Act
            const result = await BlogRepository.postBlog(newBlog);

            // Assert
            expect(Blog.create).toHaveBeenCalledWith(newBlog);
            expect(expectedBlog.reload).toHaveBeenCalledWith({
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name', 'username'],
                }],
            });
            expect(result).toEqual(expectedBlog);
        });
    });

    describe('getBlogById', () => {
        it('should retrieve a blog by its ID', async () => {
            // Arrange
            const blogid = '123';
            const expectedBlog = { id: 1, title: 'Blog 1' };
            Blog.findOne.mockResolvedValue(expectedBlog);

            // Act
            const result = await BlogRepository.getBlogById(blogid);

            // Assert
            expect(Blog.findOne).toHaveBeenCalledWith({
                where: { blogid },
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['name', 'username']
                }]
            });
            expect(result).toEqual(expectedBlog);
        });
    });

    describe('updateBlogById', () => {
        it('should update a blog by its ID', async () => {
            // Arrange
            const blog = { id: 1, title: 'Blog 1', update: jest.fn() };
            const blogUpdateReqDto = { title: 'Updated Blog', content: 'Updated content', status: 'draft' };
            const updatedBlog = { ...blog, ...blogUpdateReqDto };
            blog.update.mockResolvedValue(updatedBlog);

            // Act
            const result = await BlogRepository.updateBlogById(blog, blogUpdateReqDto);

            // Assert
            expect(blog.update).toHaveBeenCalledWith(blogUpdateReqDto);
            expect(result).toEqual(updatedBlog);
        });
    });

    describe('deleteBlogById', () => {
        it('should delete a blog by its ID', async () => {
            // Arrange
            const blog = { id: 1, destroy: jest.fn() };

            // Act
            await BlogRepository.deleteBlogById(blog);

            // Assert
            expect(blog.destroy).toHaveBeenCalled();
        });
    });

    describe('getBlogsByAuthorUsername', () => {
        it('should retrieve blogs by author username', async () => {
            // Arrange
            const username = 'john_doe';
            const offset = 0;
            const limit = 10;
            const expectedBlogs = [{ id: 1, title: 'Blog 1' }, { id: 2, title: 'Blog 2' }];
            const expectedResult = {
                rows: expectedBlogs,
                count: expectedBlogs.length,
            };
            Blog.findAndCountAll.mockResolvedValue(expectedResult);

            // Act
            const result = await BlogRepository.getBlogsByAuthorUsername(username, offset, limit);

            // Assert
            expect(Blog.findAndCountAll).toHaveBeenCalledWith({
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
            expect(result).toEqual(expectedResult);
        });
    });
});
