const express = require('express');
const router = express();

const authValidator = require('../validators/auth.route.validator');

const validationCheck = require('../middlewares/validation.middleware');

const authController = require("../controllers/auth.controller");

router.post('/signup', authValidator.signup, validationCheck, authController.userRegistration);

router.post('/login', authValidator.login, validationCheck, authController.userLogin);

module.exports = router;