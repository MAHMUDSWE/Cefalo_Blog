const express = require('express');
const router = express.Router();

const authController = require('../controllers/googleAuth.controller');

router.get('/google', authController.googleSignIn);

router.get('/google/callback', authController.googleCallback);

module.exports = router;
