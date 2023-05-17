const { HttpError, StatusCode } = require('../../../utils/commonObject.util');
const { validationResult } = require('express-validator');
const validationCheck = require('../../../middlewares/validation.middleware');

jest.mock('../../../utils/commonObject.util');
jest.mock('express-validator');

describe('Validation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {};
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass the validation check if there are no errors', () => {
        validationResult.mockReturnValueOnce({ isEmpty: () => true });

        expect(() => {
            validationCheck(req, res, next);
        }).not.toThrow();

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(next).toHaveBeenCalled();
    });

    it('should throw an HttpError with status code 400 and error messages if validation fails', () => {
        const errors = [{ msg: 'Error 1' }, { msg: 'Error 2' }];
        validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => errors });

        expect(() => {
            validationCheck(req, res, next);
        }).toThrow(new HttpError(StatusCode.BAD_REQUEST, ['Error 1', 'Error 2']));

        expect(validationResult).toHaveBeenCalledWith(req);
        expect(next).not.toHaveBeenCalled();
    });
});
