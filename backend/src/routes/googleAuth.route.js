const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/googleAuth.controller');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/login-failed',
        successRedirect: '/auth/google/success'
    }));

router.get('/google/success', authController.oauthCallBack);
router.get('/google/login-failed', authController.oauthCallBackFailed)

module.exports = router;
