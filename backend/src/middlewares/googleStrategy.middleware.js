const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

const passport = require('passport');
const { getUserByOAuthId, getUserNameCount } = require('../services/user.service');
const { createUserFromOAuthProfile } = require('../services/googleAuth.service');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.emails.read'
    ]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await createUserFromOAuthProfile(profile, done);

    } catch (error) {
        done(error, false, error.message);
    }
});

passport.serializeUser((user, done) => {
    done(null, user.oauthid);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserByOAuthId(id);
        done(null, user);
    } catch (error) {
        done(error, false, error.message);
    }
});