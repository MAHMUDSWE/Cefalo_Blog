/**
 * Utility functions for the application.
 * @module Services/User
 */

const { UserDTO } = require('../dto/response/user.res.dto');
const userRepository = require('../repositories/user.repository');

const { StatusCode, HttpError } = require('../utils/commonObject.util');
const paginationUtils = require('../utils/pagination.util');

/**
 * Retrieves all users based on the given pagination parameters.
 *
 * @param {Object} paginationParameter - Object containing pagination parameters (page, pageSize, etc.)
 * @returns {Promise<Object>} - Object containing an array of users, current page, total pages, and total users.
 * @throws {HttpError} - Throws a 404 error if no users are found.
 */

const getAllUser = async (paginationParameter) => {

    const { offset, limit } = paginationUtils.pagination(paginationParameter);

    const { count, rows } = await userRepository.getAllUser(offset, limit);


    if (!rows[0]) {
        return rows
    }
    return {
        users: rows.map((user) => new UserDTO(user)),
        currentPage: paginationUtils.currentPage(offset, limit),
        totalPages: paginationUtils.totalPages(count, limit),
        totalUsers: count
    };
}

/**
 * Retrieves a user by their username.
 *
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<UserDTO>} - The user with the specified username.
 * @throws {HttpError} - Throws a 404 error if no user is found.
 */

const getUserByUsername = async (username) => {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, "User not found");
    }
    return new UserDTO(user);
}


const getUserById = async (userid) => {
    const user = await userRepository.getUserById(userid);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, "User not found");
    }
    return new UserDTO(user);
}

/**
 * Updates a user with the specified ID using the given fields.
 *
 * @param {number} userid - The ID of the user to update.
 * @param {Object} updateFields - The fields to update for the user.
 * @returns {Promise<UserDTO>} - The updated user object.
 * @throws {HttpError} - Throws a 404 error if no user with the specified ID is found.
 */

const updateUser = async (userid, updateFields) => {

    const user = await userRepository.getUserById(userid);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`);
    }

    if (await userRepository.getUserByEmail(updateFields?.email)) {

        throw new HttpError(StatusCode.CONFLICT, 'Email already in use')
    }

    if (await userRepository.getUserByUsername(updateFields?.username)) {
        throw new HttpError(StatusCode.CONFLICT, 'Username already in use')
    }

    const updatedUser = await userRepository.updateUser(user, updateFields);

    return new UserDTO(updatedUser);
}

/**
 * Deletes the user with the specified ID.
 *
 * @param {number} userid - The ID of the user to delete.
 * @throws {HttpError} - Throws a 404 error if no user with the specified ID is found.
 */

const deleteUser = async (userid) => {

    const user = await userRepository.getUserById(userid);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`);
    }


    await userRepository.deleteUser(userid);

}

module.exports = {
    getAllUser,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser
};
