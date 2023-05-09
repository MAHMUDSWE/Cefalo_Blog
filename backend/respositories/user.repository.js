const User = require('../models/user.model');

const getAllUser = async () => {
    const users = await User.findAll();

    return users;
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({ where: { username } });

    if (!user) {
        return null;
    }

    return user;

}

const getUserById = async (userid) => {
    const user = await User.findOne({ where: { userid } });

    if (!user) {
        return null;
    }

    return user;

}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    return user;
}

const updateUser = async (user, updateFields) => {

    const updatedUser = await user.update(updateFields);

    return updatedUser;
}

const deleteUser = async (userid) => {
    await User.destroy({ where: { userid } });
}

module.exports = {
    getAllUser,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
