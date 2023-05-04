const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require("cors");
const morgan = require('morgan'); //logging requests

const Authentication = require('./middlewares/authentication.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');

app.use(cors());
app.options(('*'), cors());

const dotenv = require('dotenv');
dotenv.config();

// //middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(Authentication);



const indexRouter = require("./routes/index.route");

app.use(indexRouter);


app.use(errorHandler.notFound);
app.use(errorHandler.error);

module.exports = app;