/**
 * This is the entry point of the application.
 * It starts the server and listens for incoming requests.
 * @module App
 */

const app = require("./app");
const dotenv = require("dotenv");

const { connectToDatabase } = require('./src/configs/sequelize.config');

dotenv.config();

/**
 * The port on which the server will listen for incoming requests.
 * It uses the value of the PORT environment variable, or 3000 if not set.
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
