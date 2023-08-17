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
const googleAuthRoutes = require("./googleAuth.route");

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
router.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cefalo Blog - Home</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              text-align: center;
            }
  
            h1 {
              color: #333;
              font-size: 32px;
            }
  
            p {
              color: #666;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to Cefalo Blog!</h1>
          <p>This is the home page of the Cefalo Blog Web Service.</p>
          <p>Check out the documentation on <a href="https://github.com/MAHMUDSWE/Cefalo_Blog/tree/readmeDocumentation/backend#cefalo_blog-web-service-documentation">
          Github</a></p>
          
        </body>
      </html>
    `);
});

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

router.use(`/auth`, googleAuthRoutes);

module.exports = router;
