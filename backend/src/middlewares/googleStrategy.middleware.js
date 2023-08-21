const express = require('express');
const router = express.Router();

const passport = require('passport');
const { getUserByOAuthId, getUserNameCount } = require('../services/user.service');
const { createUserFromOAuthProfile } = require('../services/googleAuth.service');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const users = [];


module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        await createUserFromOAuthProfile(profile, done)
        // users.push(newUser);

        // done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
});

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserByOAuthId(id);
        done(null, user);
    } catch (error) {
        done(error, false, error.message);
    }
});