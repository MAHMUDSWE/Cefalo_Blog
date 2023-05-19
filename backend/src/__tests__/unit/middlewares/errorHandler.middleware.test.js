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


    it('should handle HttpError and send the appropriate response', () => {
        const err = new HttpError(StatusCode.BAD_REQUEST, 'Bad Request');

        error(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
        expect(res.send).toHaveBeenCalledWith(
            convertData({ message: 'Bad Request' }, '')
        );
    });

    it('should handle non-HttpError and send internal server error response', () => {
        const err = new Error('Internal Server Error');

        error(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
        expect(res.send).toHaveBeenCalledWith(
            convertData({ message: 'Internal Server Error' }, '')
        );
    });
});
