/**
 * Module representing DTOs for signup requests
 * @module Middleware/ContentNegotiation
 */

/**
 * Middleware for content negotiation based on request headers.
 * If the client has not specified the response format, it sets JSON as default.
 * Otherwise, it sets the response format as requested by the client.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 * @param {Function} next - Callback function to call next middleware in the chain.
 */
function contentNegotiation(req, res, next) {

    const acceptedTypes = req.accepts();
    const defaultType = 'application/json';

    if (acceptedTypes[0] === '*/*' || acceptedTypes.includes(defaultType)) {
        req.requestedFormat = 'json';
        res.setHeader('Content-Type', defaultType);
        next();
    }
    else {
        const acceptedType = acceptedTypes.find(type => type !== '*/*');

        if (acceptedType) {
            const requestedFormat = acceptedType.split('/')[1];
            req.requestedFormat = requestedFormat;
            res.setHeader('Content-Type', acceptedType);
        }
        next();
    }
}

module.exports = contentNegotiation;
