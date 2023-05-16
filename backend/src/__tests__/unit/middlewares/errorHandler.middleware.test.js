const { notFound, error } = require('../../../middlewares/errorHandler.middleware');
const { StatusCode, HttpError } = require('../../../utils/commonObject.util');
const convertData = require('../../../utils/convertData.util');

describe('Error Handler Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('notFound Middleware', () => {
        it('should throw HttpError with status code 404 for invalid API routes', () => {
            notFound(req, res, next);

            expect(next).toHaveBeenCalledWith(
                new HttpError(StatusCode.NOT_FOUND, 'Error! Invalid APIs route')
            );
        });
    });


});
