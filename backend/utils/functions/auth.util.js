const express = require('express');
const jwt = require('jsonwebtoken');

const isPublicRoute = (req) => {

    const api = process.env.API_URL;

    if (req.originalUrl === (`${api}/user/login`)) {
        return true;
    }
    else if (req.originalUrl === (`${api}/user/signup`)) {
        return true;
    }
    else {
        return false;
    }
}

const generateAccessToken = (userid) => {
    return token = jwt.sign(
        { userid },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME }
    );
}

const verifyAccessToken = (token) => {
    return data = jwt.verify(token, process.env.JWT_SECRET_KEY);
}

const setTokenToHeader = (token, res) => {
    res.set('Authorization', `Bearer ${token}`);
}

const setTokenToCookie = (token, res) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: process.env.JWT_COOKIE_EXPIRE_TIME
    });
}

module.exports = {
    isPublicRoute,
    generateAccessToken,
    verifyAccessToken,
    setTokenToHeader,
    setTokenToCookie
}