const supertest = require('supertest');
const server = require('../../../server');
const { StatusCode } = require('../../utils/commonObject.util');
const { sequelize } = require('../../configs/sequelize.config');
const User = require('../../models/user.model');

const request = supertest(server);

describe('User Routes', () => {

    let token;
    let username = "johnswe2";

    beforeAll(async () => {
        await User.sync({ force: true })

        const signupReq = {
            name: "John Doe",
            email: "john.doe2@example.com",
            username: "johnswe2",
            password: "1234",
            confirmPassword: '1234'
        };

        const signupRes = await request.post("/api/v1/user/signup").send(signupReq);

        expect(signupRes.status).toBe(201);
        userid = signupRes.body.userid;

        const loginReq = {
            username: "johnswe2",
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



    describe('GET /api/v1/user', () => {

        it('should return all user', async () => {
            const res = await request.get('/api/v1/user?page=1&limit=10')
                .set("authorization", `Bearer ${token}`);

            expect(res.status).toBe(StatusCode.OK);
            expect(res.body).toHaveProperty('users');
            expect(Array.isArray(res.body.users)).toBe(true);

            expect(res.body).toHaveProperty('currentPage');
            expect(res.body).toHaveProperty('totalPages');
            expect(res.body).toHaveProperty('totalUsers');

            expect(typeof res.body.currentPage).toBe('number');
            expect(typeof res.body.totalPages).toBe('number');
            expect(typeof res.body.totalUsers).toBe('number');

            res.body.users.forEach((user) => {
                expect(user).toHaveProperty('name');
                expect(user).toHaveProperty('username');
                expect(user).toHaveProperty('email');
            });
        });
    });

    describe('GET /api/v1/blog/:username', () => {
        it('should return a single user', async () => {
            const res = await request.get(`/api/v1/user/${username}`)
                .set("authorization", `Bearer ${token}`);

            expect(res.status).toBe(StatusCode.OK);
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('username');
            expect(res.body).toHaveProperty('email');
        });
    });

    describe('PUT /api/v1/blog/:username', () => {
        it('should update a user', async () => {

            const updatedUser = {
                name: 'updated name',
                password: '1234',
                confirmPassword: '1234'
            };
            const response = await request
                .put(`/api/v1/user/${username}`)
                .send(updatedUser)
                .set("authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', updatedUser.name);
        });
        it('should throw error when password do not match', async () => {

            const updatedUser = {
                name: 'updated name',
                password: '1234',
                confirmPassword: '5678' // Mismatched password
            };

            const response = await request
                .put(`/api/v1/user/${username}`)
                .send(updatedUser)
                .set("authorization", `Bearer ${token}`);

            expect(response.status).toBe(StatusCode.BAD_REQUEST);
            expect(response.body).toHaveProperty('message', 'Passwords do not match');
        });
    });

    describe('DELETE /api/v1/user/:username', () => {
        it('should delete the user', async () => {
            const res = await request
                .delete(`/api/v1/user/${username}`)
                .set('authorization', `Bearer ${token}`);

            expect(res.status).toBe(StatusCode.OK);
            expect(res.body).toHaveProperty('message');
        });
    });

});
