const express = require('express');

const userRegistration = (req, res) => {
    res.send("controller for user registration");
}

const userLogin = (req, res) => {
    res.send("controller for user log in");
}

module.exports = {
    userRegistration,
    userLogin
}