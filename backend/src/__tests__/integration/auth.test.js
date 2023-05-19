const supertest = require('supertest');
const server = require('../../../server');
const { StatusCode } = require('../../utils/commonObject.util');
const { sequelize } = require('../../configs/sequelize.config');
const User = require('../../models/user.model');

const request = supertest(server);

describe('Auth Routes', () => {

    beforeAll(async () => {
        await User.sync({ force: true });
    });

    afterAll(async () => {
        server.close()
        await sequelize.close()
    });


    describe('POST /signup', () => {
        it('should register a new user', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                username: 'johnswe',
                password: '1234',
                confirmPassword: '1234'
            };

            const res = await request.post('/api/v1/user/signup').send(userData);

            expect(res.status).toBe(StatusCode.CREATED);
            expect(res.body.user).toHaveProperty('name', userData.name);
            expect(res.body.user).toHaveProperty('email', userData.email);
            expect(res.body.user).toHaveProperty('username', userData.username);
        });

        it('should throw error when password do not match', async () => {

            const userData = {
                name: 'John Doe',
                email: 'john.doex@example.com',
                username: 'johnswex',
                password: '1234',
                confirmPassword: '7896'
            };

            const res = await request
                .post('/api/v1/user/signup')
                .send(userData);

            expect(res.status).toBe(StatusCode.BAD_REQUEST);
            expect(res.body).toHaveProperty('message', 'Passwords do not match');
        });
    });

    describe('POST /login', () => {
        it('should login and return an access token', async () => {
            const loginData = {
                username: 'johnswe',
                password: '1234',
            };
            const res = await request.post("/api/v1/user/login").send(loginData);

            expect(res.status).toBe(StatusCode.OK);
            expect(res.body).toHaveProperty('access_token');

            token = res.body.access_token;
        });
    });

});
