/**
 * Utility functions for the application.
 * @module Services/Auth
 */

const { v4: uuidv4 } = require('uuid');

const authRepository = require("../repositories/auth.repository");
const userRepository = require("../repositories/user.repository");

const authUtils = require("../utils/auth.util");
const bcryptUtils = require("../utils/bcrypt.util");

const { UserDTO } = require('../dto/response/user.res.dto');
const { StatusCode, HttpError } = require('../utils/commonObject.util');



/**
 * Registers a new user and returns the user object as a UserDTO instance.
 *
 * @async
 * @function
 * @param {object} signupReqDto - The user registration request data.
 * @param {string} signupReqDto.email - The email address of the user.
 * @param {string} signupReqDto.username - The username of the user.
 * @param {string} signupReqDto.password - The password of the user.
 * @returns {Promise<UserDTO>} The user object as a UserDTO instance.
 * @throws {HttpError} If the email or username is already in use.
 */
const userRegistration = async (signupReqDto) => {

    const { email, username, password } = signupReqDto;

    if (await userRepository.getUserByEmail(email)) {

        throw new HttpError(StatusCode.CONFLICT, 'Email already in use')
    }

    if (await userRepository.getUserByUsername(username)) {
        throw new HttpError(StatusCode.CONFLICT, 'Username already in use')
    }

    const hashedPassword = await bcryptUtils.hashPassword(password);

    const newUser = {
        userid: uuidv4(),
        ...signupReqDto,
        password: hashedPassword
    }

    const user = await authRepository.userRegistration(newUser);

    return new UserDTO(user);
}

/**
 * Authenticates a user and generates and sets a JWT access token in the Authorization header of the HTTP response.
 *
 * @async
 * @function
 * @param {object} res - The HTTP response object.
 * @param {object} loginCredentials - The user login credentials.
 * @param {string} loginCredentials.username - The username of the user.
 * @param {string} loginCredentials.password - The password of the user.
 * @returns {Promise<string>} The JWT access token.
 * @throws {HttpError} If the username or password is invalid.
 */
const userLogin = async (res, loginCredentials) => {

    const { username, password } = loginCredentials;

    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new HttpError(401, 'Invalid username or password');
    }

    const isPasswordValid = await bcryptUtils.verifyPassword(password, user.password);

    if (!isPasswordValid) {
        throw new HttpError(401, 'Invalid username or password');
    }

    const token = authUtils.generateAccessToken(user.userid);

    authUtils.setTokenToHeader(token, res);

    return token;
}

module.exports = {
    userRegistration,
    userLogin
};
