/**
 * Module representing DTOs for signup requests
 * @module Models/user
 */

/**
 * User model for Sequelize ORM
 * @typedef {Object} User
 * @property {string} userid - primary key of user table
 * @property {string} name - user's name
 * @property {string} email - user's email
 * @property {string} username - user's username
 * @property {string} password - user's password
 */

const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/sequelize.config');

/**
 * Sequelize User model
 * @type {import('sequelize').Model<User>}
 */
const User = sequelize.define('tbl_user', {
    userid: {
        type: DataTypes.STRING(150),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(69),
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(69),
        allowNull: false
    }
});

module.exports = User;
