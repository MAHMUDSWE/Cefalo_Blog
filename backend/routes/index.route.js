const express = require('express');
const router = express();

//Routes
const userRoutes = require("./user.route");
const blogRoutes = require("./blog.route");
const authRoutes = require("./auth.route");


const api = process.env.API_URL;

router.use(`${api}/user`, userRoutes);
router.use(`${api}/blog`, blogRoutes);
router.use(`${api}/user`, authRoutes);

module.exports = router;

