/**
 * Auth repository module.
 * @module Repositories/Auth
 * @description Repositories functions for handling authentication related operations
 */

const express = require('express')
const User = require('../models/user.model');

/**
 * Registers a new user in the database.
 * @async
 * @function
 * @param {object} newUser - The user object to be registered.
 * @param {string} newUser.userid - The unique identifier of the user.
 * @param {string} newUser.name - The name of the user.
 * @param {string} newUser.email - The email of the user.
 * @param {string} newUser.username - The username of the user.
 * @param {string} newUser.password - The password of the user.
 * @returns {Promise<object>} The newly created user object.
 * @throws Will throw an error if there is a problem creating the user.
 */


const userRegistration = async (newUser) => {

    const { userid, name, email, username, password } = newUser;

    return await User.create({ userid, name, email, username, password });
}

/**
 * Logs in a user with the provided credentials.
 * @async
 * @function
 * @param {object} loginCredentials - The user's login credentials.
 * @param {string} loginCredentials.username - The username of the user.
 * @param {string} loginCredentials.password - The password of the user.
 * @returns {Promise<object|null>} The user object if login is successful, null otherwise.
 * @throws Will throw an error if there is a problem with the login.
 */


const userLogin = async (loginCredentials) => {

    return null;
}

module.exports = {
    userRegistration,
    userLogin
}