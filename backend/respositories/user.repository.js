const User = require('../models/user.model');

const getAllUser = async () => {
    const users = await User.findAll();
    return users;
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({ where: { username } });
    return user;
}

const updateUserByUsername = (req, res) => {
    res.send("controller for updating user profile");
}

const deleteUserByUsername = (req, res) => {
    res.send("controller for deleteing user");
}

module.exports = {
    getAllUser,
    getUserByUsername,
    updateUserByUsername,
    deleteUserByUsername
};
