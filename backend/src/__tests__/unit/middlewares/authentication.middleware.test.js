const Authentication = require('../../../middlewares/authentication.middleware');
const { HttpError, StatusCode } = require('../../../utils/commonObject.util');
const { isPublicRoute } = require('../../../utils/publicRoute.util');
const authUtils = require('../../../utils/auth.util');

jest.mock('../../../utils/publicRoute.util');
jest.mock('../../../utils/auth.util');
jest.mock('../../../utils/commonObject.util')

describe('Authentication middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            cookies: {},
            headers: {},
        };
        res = {};
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next middleware if it is a public route', () => {
        isPublicRoute.mockReturnValue(true);

        Authentication(req, res, next);

        expect(isPublicRoute).toHaveBeenCalledWith(req);
        expect(next).toHaveBeenCalled();
    });

    it("should throw HttpError with UNAUTHORIZED status code if no token is found", () => {
        req.cookies = {};

        expect(next).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalledWith(new HttpError(StatusCode.UNAUTHORIZED, "Unauthorized, token not found"));
    });



    it('should set the user ID from the token and call next middleware if token is valid', () => {
        isPublicRoute.mockReturnValue(false);
        req.cookies.token = 'valid-access-token';
        const data = { userid: 'user123' };
        authUtils.verifyAccessToken.mockReturnValue(data);

        Authentication(req, res, next);

        expect(authUtils.verifyAccessToken).toHaveBeenCalledWith('valid-access-token');
        expect(req.userid).toBe('user123');
        expect(next).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalledWith(expect.any(HttpError));
    });

    it('should throw HttpError with status code 401 if token is invalid', () => {
        isPublicRoute.mockReturnValue(false);

        authUtils.verifyAccessToken.mockImplementation(() => {
            throw new Error();
        });

        expect(next).not.toHaveBeenCalledWith(new HttpError(StatusCode.UNAUTHORIZED, "Unauthorized, token not found"));
    });
});
