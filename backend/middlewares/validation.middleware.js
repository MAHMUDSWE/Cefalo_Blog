const { validationResult } = require('express-validator');
const HttpError = require('../utils/objects/httpError.object');
const StatusCode = require('../utils/objects/statusCode.object');

var validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(StatusCode.BAD_REQUEST, errors.array()
            .map((e) => e.msg)
        );

        //return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }
    next();
}

module.exports = validationCheck;