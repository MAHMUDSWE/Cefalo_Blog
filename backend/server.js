const app = require("./app");
const dotenv = require("dotenv");

const { connectToDatabase } = require('./configs/sequelize.config');

dotenv.config();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});