const { validationResult } = require('express-validator');

const { StatusCode, HttpError } = require('../utils/commonObject.util');

var validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(StatusCode.BAD_REQUEST, errors.array()
            .map((e) => e.msg)
        );
    }
    next();
}

module.exports = validationCheck;