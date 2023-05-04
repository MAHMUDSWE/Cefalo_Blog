const Sequelize = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD
    , {
        host: process.env.DB_HOST,
        port: 3307,
        dialect: process.env.DB_DIALECT,
        logging: false
    });

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');

        await sequelize.sync();
        console.log("Models have been synced successfully.");

    } catch (error) {
        console.error('Unable to sync the models', error);
    }
}

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database Connection has been established successfully.');

//         await sequelize.sync();
//         console.log("Models have been synced successfully.");

//     } catch (error) {
//         console.error('Unable to sync the models', error);
//     }
// })();

module.exports = { sequelize, connectToDatabase };