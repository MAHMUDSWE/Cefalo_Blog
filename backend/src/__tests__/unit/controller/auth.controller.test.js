const { userRegistration, userLogin } = require('../../../controllers/auth.controller');
const authService = require('../../../services/auth.service');

jest.mock('../../../services/auth.service');

describe('Auth Controller', () => {
    describe('userRegistration', () => {

        it('should register a new user and return the created profile', async () => {
            const req = {
                body: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    username: 'johndoe',
                    password: 'password123',
                    confirmPassword: 'password123',
                },
                requestedFormat: 'json',
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const next = jest.fn();

            const user = {
                name: 'John Doe',
                username: 'johndoe',
            };
            const authServiceMock = jest.spyOn(authService, 'userRegistration').mockResolvedValue(user);

            await userRegistration(req, res, next);

            expect(authServiceMock).toHaveBeenCalledWith(expect.any(Object));
            expect(res.status).toHaveBeenCalledWith(expect.any(Number));
            expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Profile for John Doe with username johndoe created successfully'));

            authServiceMock.mockRestore();
        });

        it('should call the next function with an error if registration fails', async () => {
            const req = {
                body: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    username: 'johndoe',
                    password: 'password123',
                    confirmPassword: 'password123',
                },
                requestedFormat: 'json',
            };
            const res = {};
            const next = jest.fn();

            const error = new Error('Registration failed');
            const authServiceMock = jest.spyOn(authService, 'userRegistration').mockRejectedValue(error);

            await userRegistration(req, res, next);

            expect(authServiceMock).toHaveBeenCalledWith(expect.any(Object));
            expect(next).toHaveBeenCalledWith(error);

            authServiceMock.mockRestore();
        });
    });

    describe('userLogin', () => {
        it('should log in the user and return the access token', async () => {
            const req = {
                body: {
                    email: 'johndoe@example.com',
                    password: 'password123',
                },
                requestedFormat: 'json',
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const next = jest.fn();

            const token = 'access_token';
            const authServiceMock = jest.spyOn(authService, 'userLogin').mockResolvedValue(token);

            await userLogin(req, res, next);

            expect(authServiceMock).toHaveBeenCalledWith(res, expect.any(Object));
            expect(res.status).toHaveBeenCalledWith(expect.any(Number));
            expect(res.send).toHaveBeenCalledWith(expect.stringContaining('{"access_token":"access_token"}'));

            authServiceMock.mockRestore();
        });

        it('should call the next function with an error if login fails', async () => {
            const req = {
                body: {
                    username: 'johndoe',
                    password: 'password123',
                },
                requestedFormat: 'json',
            };
            const res = {};
            const next = jest.fn();

            const error = new Error('Login failed');
            const authServiceMock = jest.spyOn(authService, 'userLogin').mockRejectedValue(error);

            await userLogin(req, res, next);

            expect(authServiceMock).toHaveBeenCalledWith(res, expect.any(Object));
            expect(next).toHaveBeenCalledWith(error);

            authServiceMock.mockRestore();
        });
    });
});
