const express = require('express');

/**
 * Index routes module
 * @module Repositories/Index
 * @description Index routes
 */

//Routes
const userRoutes = require("./user.route");
const blogRoutes = require("./blog.route");
const authRoutes = require("./auth.route");

const router = express();

// API base URL
const api = process.env.API_URL;

/**
 * Mount the user routes on the '/api/v1/user' path
 * @name GET /api/v1/user
 * @function
 * @memberof module:Routes/Api
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.use(`${api}/user`, userRoutes);

/**
 * Mount the blog routes on the '/api/v1/blog' path
 * @name GET /api/v1/blog
 * @function
 * @memberof module:Routes/Api
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.use(`${api}/blog`, blogRoutes);

/**
 * Mount the auth routes on the '/api/v1/user' path
 * @name GET /api/v1/user
 * @function
 * @memberof module:Routes/Api
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.use(`${api}/user`, authRoutes);

module.exports = router;
