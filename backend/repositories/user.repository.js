/**
 * User repository module.
 * @module Repositories/User
 * @description Repositories functions for handling User related operations
 */

const Blog = require('../models/blog.model');
const User = require('../models/user.model');

/**
 * Retrieves all users
 * @async
 * @function
 * @param {number} offset - The number of records to skip
 * @param {number} limit - The maximum number of records to return
 * @returns {Promise<{ count: number, rows: User[] }>} - An object containing the total number of records and an array of User instances
 */
const getAllUser = async (offset, limit) => {

    const result = await User.findAndCountAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
    });

    return result;
}


/**
 * Retrieves a user by their username
 * @async
 * @function
 * @param {string} username - The username of the user to retrieve
 * @returns {Promise<User|null>} - The User instance, or null if not found
 */

const getUserByUsername = async (username) => {
    const user = await User.findOne({
        where: { username }
    });

    if (!user) {
        return null;
    }

    return user;
}

/**
 * Retrieves a user by their user ID
 * @async
 * @function
 * @param {number} userid - The ID of the user to retrieve
 * @returns {Promise<User|null>} - The User instance, or null if not found
 */

const getUserById = async (userid) => {
    const user = await User.findOne({ where: { userid } });

    if (!user) {
        return null;
    }

    return user;

}

/**
 * Retrieves a user by their email address
 * @async
 * @function
 * @param {string} email - The email address of the user to retrieve
 * @returns {Promise<User|null>} - The User instance, or null if not found
 */

const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    return user;
}

/**
 * Updates a user with the given fields
 * @async
 * @function
 * @param {User} user - The User instance to update
 * @param {Object} updateFields - An object containing the fields to update and their new values
 * @returns {Promise<User>} - The updated User instance
 */

const updateUser = async (user, updateFields) => {

    const updatedUser = await user.update(updateFields);

    return updatedUser;
}

/**
 * Deletes a user with the given ID
 * @async
 * @function
 * @param {number} userid - The ID of the user to delete
 * @returns {Promise<void>}
 */

const deleteUser = async (userid) => {
    await User.destroy({ where: { userid } });
}

module.exports = {
    getAllUser,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
