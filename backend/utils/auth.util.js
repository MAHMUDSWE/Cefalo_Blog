/**
 * Utility functions for the application.
 * @module Utils
 */
const jwt = require('jsonwebtoken');

/**
 * Generates a JWT access token for a given user ID.
 *
 * @function
 * @name generateAccessToken
 * @param {string} userid - The user ID to include in the token payload.
 * @returns {string} The generated access token.
 */

const generateAccessToken = (userid) => {
    return token = jwt.sign(
        { userid },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME }
    );
}

/**
 * Verifies a JWT access token and returns its payload data.
 *
 * @function
 * @name verifyAccessToken
 * @param {string} token - The access token to verify.
 * @returns {object} The payload data from the verified access token.
 */

const verifyAccessToken = (token) => {
    return data = jwt.verify(token, process.env.JWT_SECRET_KEY);
}

/**
 * Sets a JWT access token to the 'Authorization' header of an HTTP response.
 *
 * @function
 * @name setTokenToHeader
 * @param {string} token - The access token to set in the header.
 * @param {object} res - The HTTP response object.
 */

const setTokenToHeader = (token, res) => {
    res.set('Authorization', `Bearer ${token}`);
}

/**
 * Sets a JWT access token to a HTTP cookie in an HTTP response.
 *
 * @function
 * @name setTokenToCookie
 * @param {string} token - The access token to set in the cookie.
 * @param {object} res - The HTTP response object.
 */

const setTokenToCookie = (token, res) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: process.env.JWT_COOKIE_EXPIRE_TIME
    });
}

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    setTokenToHeader,
    setTokenToCookie
}
