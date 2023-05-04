const User = require('../models/user.model');

const getAllUser = async () => {
    const users = await User.findAll({
        attributes: ['name', 'email', 'username'],

        // attributes: { exclude: ['password'] },

        // exclude: ['password']
    });
    return users;
}

const getUserByUsername = async (username) => {
    const user = await User.findOne(
        {
            where: { username },
            attributes: ['name', 'email', 'username']
        });
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
