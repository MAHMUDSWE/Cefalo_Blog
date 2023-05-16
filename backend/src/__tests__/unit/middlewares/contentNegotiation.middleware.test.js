const contentNegotiation = require('../../../middlewares/contentNegotiation.middleware');

describe('Content Negotiation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            accepts: jest.fn(),
            requestedFormat: undefined,
        };
        res = {
            setHeader: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set JSON as the default response format when no specific format is requested', () => {
        req.accepts.mockReturnValue(['*/*']);

        contentNegotiation(req, res, next);

        expect(req.requestedFormat).toBe('json');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(next).toHaveBeenCalled();
    });

    it('should set the requested response format and content type when a specific format is requested', () => {
        req.accepts.mockReturnValue(['text/xml', 'application/html']);

        contentNegotiation(req, res, next);

        expect(req.requestedFormat).toBe('xml');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/xml');
        expect(next).toHaveBeenCalled();
    });

    it('should ignore wildcard accept type and set JSON as the default response format', () => {
        req.accepts.mockReturnValue(['*/*', 'text/html']);

        contentNegotiation(req, res, next);

        expect(req.requestedFormat).toBe('json');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(next).toHaveBeenCalled();
    });

    it('should set JSON as the default response format when the default type is explicitly accepted', () => {
        req.accepts.mockReturnValue(['application/json']);

        contentNegotiation(req, res, next);

        expect(req.requestedFormat).toBe('json');
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(next).toHaveBeenCalled();
    });

    it('should call the next middleware even when no accepted types are provided', () => {
        req.accepts.mockReturnValue([]);

        contentNegotiation(req, res, next);

        expect(req.requestedFormat).toBeUndefined();
        expect(res.setHeader).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});
