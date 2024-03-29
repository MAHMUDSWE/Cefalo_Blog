/**
 * This module creates a Sequelize instance and establishes a database connection.
 * @module Database Configuration
 * @requires sequelize
 * @requires dotenv
 */

const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Sequelize instance representing the database connection.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        storage: process.env.STORAGE, //used for testing with in memory database
        logging: false
    });

/**
 * Asynchronous function that establishes a database connection and syncs models.
 * @async
 * @function connectToDatabase
 * @returns {Promise<void>} Resolves when the database connection is established and models are synced.
 */
async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');

        await sequelize.sync();
        console.log("Models have been synced successfully.");
    } catch (error) {
        console.log(error);
        // throw error;
        // throw new Error('Unable to sync the models');
    }
}

module.exports = {
    sequelize,
    Op: Sequelize.Op,
    connectToDatabase
};
