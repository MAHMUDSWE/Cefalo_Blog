const express = require('express');
const router = express.Router();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const users = [];


module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

    const existingUser = users.find(user => user.googleId === profile.id);
    if (existingUser) {
        return done(null, existingUser);
    }

    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
    };
    users.push(newUser);

    done(null, newUser);
});

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.googleId === id);
    done(null, user);
});