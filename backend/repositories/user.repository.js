const Blog = require('../models/blog.model');
const User = require('../models/user.model');

const getAllUser = async (offset, limit) => {

    const result = await User.findAndCountAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
    });

    return result;
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({
        where: { username }
    });

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
