const express = require('express');
const User = require('../models/user.model');

const getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const updateUserByUsername = (req, res) => {
    res.send("controller for updating user profile");
}

const deleteUserByUsername = (req, res) => {
    res.send("controller for deleteing user");
}

module.exports = {
    getUserByUsername,
    updateUserByUsername,
    deleteUserByUsername
};

