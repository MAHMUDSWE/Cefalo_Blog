const express = require('express');
const router = express();

const authController = require("../controllers/auth.controller");

router.post('/signup', authController.userRegistration);

router.post('login', authController.userLogin);

module.exports = router;