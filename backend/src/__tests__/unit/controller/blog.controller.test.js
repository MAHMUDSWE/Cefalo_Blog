const { getAllBlogs, postBlog, getBlogById, updateBlogById, deleteBlogById, getBlogsByAuthorUsername } = require('../../../controllers/blog.controller');
const blogService = require('../../../services/blog.service');
const { StatusCode } = require('../../../utils/commonObject.util');
const convertData = require('../../../utils/convertData.util');

jest.mock('../../../services/blog.service');
jest.mock('../../../utils/convertData.util');

describe('Blog Controller', () => {
    describe('getAllBlogs', () => {
        it('should get all blog posts', async () => {
            const req = { query: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();

            const blogs = [{ id: 1, title: 'Blog 1' }, { id: 2, title: 'Blog 2' }];
            const convertedData = { convertedBlogs: blogs };
            blogService.getAllBlogs.mockResolvedValue(blogs);
            convertData.mockReturnValue(convertedData);

            await getAllBlogs(req, res, next);

            expect(blogService.getAllBlogs).toHaveBeenCalledWith(req.query);
            expect(convertData).toHaveBeenCalledWith(blogs, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });

        it('should handle errors when getting all blog posts', async () => {
            const req = { query: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to get blog posts');
            blogService.getAllBlogs.mockRejectedValue(error);

            await getAllBlogs(req, res, next);

            expect(blogService.getAllBlogs).toHaveBeenCalledWith(req.query);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('postBlog', () => {
        it('should post a new blog', async () => {
            const req = {
                body: {
                    title: 'New Blog',
                    content: 'Lorem ipsum dolor sit amet',
                    status: 'published'
                },
                userid: 'user123'
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();

            const blog = {
                id: 1,
                title: 'New Blog',
                content: 'Lorem ipsum dolor sit amet',
                status: 'published'
            };
            const convertedData = { convertedBlog: blog };
            blogService.postBlog.mockResolvedValue(blog);
            convertData.mockReturnValue(convertedData);

            await postBlog(req, res, next);

            expect(blogService.postBlog).toHaveBeenCalledWith(expect.any(Object));
            expect(convertData).toHaveBeenCalledWith(blog, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });

        it('should handle errors when posting a new blog', async () => {
            const req = {
                body: {
                    title: 'New Blog',
                    content: 'Lorem ipsum dolor sit amet',
                    status: 'published'
                },
                userid: 'user123'
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to post blog');
            blogService.postBlog.mockRejectedValue(error);

            await postBlog(req, res, next);

            expect(blogService.postBlog).toHaveBeenCalledWith(expect.any(Object));
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getBlogById', () => {
        it('should get a blog post by ID', async () => {
            const req = { params: { blogid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();

            const blog = { id: 1, title: 'Blog 1' };
            const convertedData = { convertedBlog: blog };
            blogService.getBlogById.mockResolvedValue(blog);
            convertData.mockReturnValue(convertedData);

            await getBlogById(req, res, next);

            expect(blogService.getBlogById).toHaveBeenCalledWith(req.params.blogid);
            expect(convertData).toHaveBeenCalledWith(blog, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });



        it('should handle errors when getting a blog post by ID', async () => {
            const req = { params: { blogid: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to get blog');
            blogService.getBlogById.mockRejectedValue(error);

            await getBlogById(req, res, next);

            expect(blogService.getBlogById).toHaveBeenCalledWith(req.params.blogid);
            expect(next).toHaveBeenCalledWith(error);
        });

    });

    describe('updateBlogById', () => {
        describe('updateBlogById', () => {
            it('should update a blog post by ID', async () => {
                const req = {
                    userid: 1,
                    params: {
                        blogid: 1
                    },
                    body: {
                        title: 'Updated Blog',
                        content: 'Updated content',
                        status: 'draft'
                    },
                    requestedFormat: 'json'
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                };
                const next = jest.fn();

                const updatedBlog = {
                    blogid: 1,
                    userid: 1,
                    title: 'Updated Blog',
                    content: 'Updated content',
                    status: 'draft'
                };
                const convertedData = {
                    convertedBlog: updatedBlog
                };

                blogService.updateBlogById.mockResolvedValue(updatedBlog);
                convertData.mockReturnValue(convertedData);

                await updateBlogById(req, res, next);

                expect(blogService.updateBlogById).toHaveBeenCalledWith({
                    blogid: 1,
                    userid: 1,
                    title: 'Updated Blog',
                    content: 'Updated content',
                    status: 'draft'
                });
                expect(convertData).toHaveBeenCalledWith(updatedBlog, 'json');
                expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
                expect(res.send).toHaveBeenCalledWith(convertedData);
            });

            it('should handle errors when updating a blog post by ID', async () => {
                const req = {
                    userid: 1,
                    params: {
                        blogid: 1
                    },
                    body: {
                        title: 'Updated Blog',
                        content: 'Updated content',
                        status: 'draft'
                    },
                    requestedFormat: 'json'
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                };
                const next = jest.fn();

                const error = new Error('Failed to update blog');
                blogService.updateBlogById.mockRejectedValue(error);

                await updateBlogById(req, res, next);

                expect(blogService.updateBlogById).toHaveBeenCalledWith({
                    blogid: 1,
                    userid: 1,
                    title: 'Updated Blog',
                    content: 'Updated content',
                    status: 'draft'
                });
                expect(next).toHaveBeenCalledWith(error);
            });
        });
    });

    describe('deleteBlogById', () => {
        describe('deleteBlogById', () => {
            it('should delete a blog post by ID', async () => {
                const req = {
                    params: {
                        blogid: 1
                    },
                    userid: 123,
                    requestedFormat: 'json'
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                };
                const next = jest.fn();

                blogService.deleteBlogById.mockResolvedValue();
                const convertedData = {
                    message: 'Blog successfully deleted'
                };
                convertData.mockReturnValue(convertedData);

                await deleteBlogById(req, res, next);

                expect(blogService.deleteBlogById).toHaveBeenCalledWith(req.userid, req.params.blogid);
                expect(convertData).toHaveBeenCalledWith({
                    message: 'Blog successfully deleted'
                }, req.requestedFormat);
                expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
                expect(res.send).toHaveBeenCalledWith(convertedData);
            });

            it('should handle errors when deleting a blog post by ID', async () => {
                const req = {
                    params: {
                        blogid: 1
                    },
                    userid: 123
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                };
                const next = jest.fn();
                const error = new Error('Failed to delete blog post');
                blogService.deleteBlogById.mockRejectedValue(error);

                await deleteBlogById(req, res, next);

                expect(blogService.deleteBlogById).toHaveBeenCalledWith(req.userid, req.params.blogid);
                expect(next).toHaveBeenCalledWith(error);
            });
        });
    });

    describe('getBlogsByAuthorUsername', () => {
        it('should get blogs by author username', async () => {
            const req = {
                params: {
                    username: 'johnDoe'
                },
                query: {
                    page: 1,
                    limit: 10
                },
                requestedFormat: 'json'
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const blogs = [{
                id: 1,
                title: 'Blog 1',
                author: 'John Doe'
            }, {
                id: 2,
                title: 'Blog 2',
                author: 'John Doe'
            }];
            const convertedData = [{
                id: 1,
                title: 'Blog 1',
                author: 'John Doe'
            }, {
                id: 2,
                title: 'Blog 2',
                author: 'John Doe'
            }];

            blogService.getBlogsByAuthorUsername.mockResolvedValue(blogs);
            convertData.mockReturnValue(convertedData);

            await getBlogsByAuthorUsername(req, res, next);

            expect(blogService.getBlogsByAuthorUsername).toHaveBeenCalledWith(req.params.username, req.query);
            expect(convertData).toHaveBeenCalledWith(blogs, req.requestedFormat);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(res.send).toHaveBeenCalledWith(convertedData);
        });

        it('should handle errors when getting blogs by author username', async () => {
            const req = {
                params: {
                    username: 'johnDoe'
                },
                query: {
                    page: 1,
                    limit: 10
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
            const next = jest.fn();
            const error = new Error('Failed to get blogs');
            blogService.getBlogsByAuthorUsername.mockRejectedValue(error);

            await getBlogsByAuthorUsername(req, res, next);

            expect(blogService.getBlogsByAuthorUsername).toHaveBeenCalledWith(req.params.username, req.query);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
