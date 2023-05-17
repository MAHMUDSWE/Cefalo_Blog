const jwt = require('jsonwebtoken');
const {
    generateAccessToken,
    verifyAccessToken,
    setTokenToHeader,
    setTokenToCookie,
} = require('../../../utils/auth.util');

jest.mock('jsonwebtoken');

describe('Utils', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateAccessToken', () => {
        it('should generate an access token', () => {
            const userid = 'user123';

            jwt.sign.mockReturnValue('generated-token');

            const token = generateAccessToken(userid);

            expect(jwt.sign).toHaveBeenCalledWith(
                { userid },
                process.env.JWT_SECRET_KEY,
                { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME }
            );
            expect(token).toBe('generated-token');
        });
    });

    describe('verifyAccessToken', () => {
        it('should verify an access token and return the payload data', () => {
            const token = 'access-token';
            const expectedData = { userid: 'user123' };

            jwt.verify.mockReturnValue(expectedData);

            const data = verifyAccessToken(token);

            expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET_KEY);
            expect(data).toEqual(expectedData);
        });
    });

    describe('setTokenToHeader', () => {
        it('should set the access token to the response header', () => {
            const token = 'access-token';
            const res = { set: jest.fn() };

            setTokenToHeader(token, res);

            expect(res.set).toHaveBeenCalledWith('Authorization', 'Bearer access-token');
        });
    });

    describe('setTokenToCookie', () => {
        it('should set the access token to the response cookie', () => {
            const token = 'access-token';
            const res = { cookie: jest.fn() };

            setTokenToCookie(token, res);

            expect(res.cookie).toHaveBeenCalledWith('token', 'access-token', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: process.env.JWT_COOKIE_EXPIRE_TIME,
            });
        });
    });
});
