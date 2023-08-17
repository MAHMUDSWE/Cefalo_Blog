const express = require('express');
const passport = require('passport');

exports.googleSignIn = passport.authenticate('google', { scope: ['profile'] });

exports.googleCallback = passport.authenticate('google', {
    failureRedirect: '/login-failed',
    successRedirect: '/success'
});
