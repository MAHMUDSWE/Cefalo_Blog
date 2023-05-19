const supertest = require('supertest');
const server = require('../../../server');
const { StatusCode } = require('../../utils/commonObject.util');
const { sequelize } = require('../../configs/sequelize.config');
const Blog = require('../../models/blog.model');
const User = require('../../models/user.model');

const request = supertest(server);

describe('User Routes', () => {

    let token;
    let username = "johnswe1";

    beforeAll(async () => {
        await Blog.sync({ force: true });
        await User.sync({ force: true })

        const signupReq = {
            name: "John Doe",
            email: "john.doe1@example.com",
            username: "johnswe1",
            password: "1234",
        };

        const signupRes = await request.post("/api/v1/user/signup").send(signupReq);

        expect(signupRes.status).toBe(201);
        userid = signupRes.body.userid;

        const loginReq = {
            username: "johnswe1",
            password: "1234",
        };

        const loginRes = await request.post("/api/v1/user/login").send(loginReq);

        expect(loginRes.status).toBe(200);

        token = loginRes.body.access_token;
    });


    afterAll(async () => {
        server.close()
        await sequelize.close()
    });


    let newlyCreatedBlogid;

    describe("POST /api/v1/blog", () => {
        it("should create a new blog post", async () => {
            const blogData = {
                title: "My Blog Post",
                content: "Lorem ipsum dolor sit amet...",
            };

            const res = await request
                .post("/api/v1/blog")
                .send(blogData)
                .set("authorization", `Bearer ${token}`);

            newlyCreatedBlogid = res.body.blogid;
            expect(res.status).toBe(StatusCode.CREATED);
        });
    });

    describe('GET /api/v1/blog', () => {

        it('should return all blogs', async () => {
            const res = await request.get('/api/v1/blog?page=1&limit=10');

            expect(res.status).toBe(StatusCode.OK);
            expect(res.body).toHaveProperty('blogs');
            expect(Array.isArray(res.body.blogs)).toBe(true);

            expect(res.body).toHaveProperty('currentPage');
            expect(res.body).toHaveProperty('totalPages');
            expect(res.body).toHaveProperty('totalBlogs');

            expect(typeof res.body.currentPage).toBe('number');
            expect(typeof res.body.totalPages).toBe('number');
            expect(typeof res.body.totalBlogs).toBe('number');

            // expect(res.body.blogs.length).toBe(res.body.totalBlogs);
            res.body.blogs.forEach((blog) => {
                expect(blog).toHaveProperty('blogid');
                expect(blog).toHaveProperty('name');
                expect(blog).toHaveProperty('username');
                expect(blog).toHaveProperty('title');
                expect(blog).toHaveProperty('content');
            });
        });
    });

    describe('GET /api/v1/blog/:blogid', () => {
        it('should return a single blog', async () => {
            const blogid = newlyCreatedBlogid;

            const res = await request.get(`/api/v1/blog/${blogid}`);

            expect(res.status).toBe(StatusCode.OK);
            expect(res.body).toHaveProperty('blogid');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('username');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('content');
        });
    });

    describe('PUT /api/v1/blog/:blogid', () => {
        it('should update a blog by ID', async () => {

            let blogid = newlyCreatedBlogid;

            const updatedBlogData = {
                title: 'Updated Blog Title',
                content: 'Updated Blog Content'
            };

            const response = await request
                .put(`/api/v1/blog/${blogid}`)
                .send(updatedBlogData)
                .set("authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('blogid', blogid);
            expect(response.body).toHaveProperty('title', updatedBlogData.title);
            expect(response.body).toHaveProperty('content', updatedBlogData.content);
        });
    });

    describe('GET /api/v1/blog/author/:username', () => {

        it('should return blogs by author username', async () => {
            // const username = 'johnswe1';

            const res = await request
                .get(`/api/v1/blog/author/${username}`)

            expect(res.status).toBe(StatusCode.OK);
            expect(res.body).toHaveProperty('blogs');
            expect(Array.isArray(res.body.blogs)).toBe(true);

        });

    });


    describe('DELETE /api/v1/blog/:blogid', () => {

        it('should delete a blog by ID', async () => {
            let blogid = newlyCreatedBlogid;

            const response = await request
                .delete(`/api/v1/blog/${blogid}`)
                .set('authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            // expect(response.body).toHaveProperty('blogid', blogid);
            expect(response.body).toHaveProperty('message', 'Blog successfully deleted');
        });
    });




});
