const bcrypt = require('bcryptjs');
/**
 * Utility functions for the application.
 * @module Utils
 */

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

/**
 * Verifies a password against a hash using bcrypt.
 *
 * @param {string} password - The password to verify.
 * @param {string} hashedPassword - The hashed password to verify against.
 * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the password matches the hash.
 */
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    verifyPassword
}
