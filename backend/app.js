/**
 * The main Express application.
 * @module App
 */

const express = require('express');
const association = require('./src/models/association.model')
const app = express();
const dotenv = require('dotenv');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require("cors");
const morgan = require('morgan');

const Authentication = require('./src/middlewares/authentication.middleware');
const errorHandler = require('./src/middlewares/errorHandler.middleware');
const indexRouter = require("./src/routes/index.route");

const googleStrategy = require('./src/middlewares/googleStrategy.middleware');

const session = require('express-session');
const passport = require('passport');
app.use(session({ secret: process.env.JWT_SECRET_KEY, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors());

/**
 * Middleware to handle preflight requests for CORS.
 * @name OPTIONS/*
 * @function
 */
app.options(('*'), cors());

// app.use(
//     cors({
//         origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_DEV],
//         credentials: true,
//         allowedHeaders: ["Content-Type", "Authorization"],
//         allowedMethods: [
//             "GET",
//             "POST",
//             "PUT",
//             "DELETE",
//             "OPTIONS",
//             "PATCH",
//             "HEAD",
//         ],
//     })
// );

const contentNegotiation = require('./src/middlewares/contentNegotiation.middleware');
dotenv.config();

// //middleware

/**
 * Middleware to parse URL-encoded request bodies.
 * @name urlencoded
 * @function
 * @memberof module:app
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Middleware to parse JSON request bodies.
 * @name json
 * @function
 * @memberof module:app
 */
app.use(bodyParser.json());

/**
 * Middleware to parse cookies from incoming requests.
 * @name cookieParser
 * @function
 * @memberof module:app
 */
app.use(cookieParser());

/**
 * Middleware to log incoming requests to the console.
 * @name morgan
 * @function
 * @memberof module:app
 */
app.use(morgan('tiny'));

/**
 * Middleware to handle content negotiation for incoming requests.
 * @name contentNegotiation
 * @function
 * @memberof module:app
 */
app.use(contentNegotiation);

/**
 * Middleware to handle authentication for incoming requests.
 * @name Authentication
 * @function
 * @memberof module:app
 */
app.use(Authentication);

/**
 * The index router.
 * @name indexRouter
 * @type {Router}
 * @memberof module:app
 */
app.use(indexRouter);

/**
 * Middleware to handle 404 errors.
 * @name notFound
 * @function
 * @memberof module:app.errorHandler
 */
app.use(errorHandler.notFound);

passport.use('google', googleStrategy);

/**
 * Middleware to handle errors.
 * @name error
 * @function
 * @memberof module:app.errorHandler
 */
app.use(errorHandler.error);

module.exports = app;
