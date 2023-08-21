const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/googleAuth.controller');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/google/login-failed',
    successRedirect: '/auth/google/success'
}));

router.get('/google/success', authController.googleCallback);

module.exports = router;
