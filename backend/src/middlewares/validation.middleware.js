/**
 * Module representing DTOs for signup requests
 * @module Middleware/Validation
 */
const { validationResult } = require('express-validator');

const { StatusCode, HttpError } = require('../utils/commonObject.util');

/**
 * Validates request parameters using express-validator.
 * Throws an HTTP error with status code 400 (BAD_REQUEST) and error messages
 * if validation fails. Otherwise, calls the next middleware function.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware function.
 * @throws {HttpError} Throws HTTP error with status code 400 and error messages if validation fails.
 * @returns {void}
 */
const validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(StatusCode.BAD_REQUEST, errors.array()
            .map((e) => e.msg)
        );
    }
    next();
}

module.exports = validationCheck;
