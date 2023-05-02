const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require('morgan'); //logging requests

const jwtAuthentication = require('./middlewares/jwt.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');

app.use(cors());
app.options(('*'), cors());

const dotenv = require('dotenv');
dotenv.config();

// //middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(jwtAuthentication);




//Routes
const userRoutes = require("./routes/user.route");
const blogRoutes = require("./routes/blog.route");


const api = process.env.API_URL;

app.use(`${api}/user`, userRoutes);
app.use(`${api}/blog`, blogRoutes);

app.get('/', (req, res) => {
    throw 'testingError';
    res.send("Server started");
})

app.use(errorHandler);

app.use((req, res, next) => {
    res.status(404).json({
        "message": "Error! Invalid APIs route",
    });
});

module.exports = app;