const { UserDTO } = require('../dto/request/user.req.dto');
const User = require('../models/user.model');

const getAllUser = async () => {
    const users = await User.findAll();

    if (!users[0]) {
        return null;
    }
    const userDTOs = users.map(user => new UserDTO(user));
    return userDTOs;
}

const getUserByUsername = async (username) => {
    var user = await User.findOne({ where: { username } });

    if (!user) {
        return null;
    }

    user = {
        userid: user.userid,
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

    return new UserDTO(user);

}

const getUserById = async (userid) => {
    var user = await User.findOne({ where: { userid } });

    if (!user) {
        return null;
    }

    user = {
        userid: user.userid,
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

    return new UserDTO(user);

}

const getUserByEmail = async (email) => {
    var user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    user = {
        userid: user.userid,
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

    return new UserDTO(user);
}

const updateUser = async (user, updateFields) => {

    var result = await User.update(updateFields, {
        where: { userid: user.userid }
    });

    return result;
}

const deleteUser = async (userid) => {
    return await User.destroy({ where: { userid } });
}

module.exports = {
    getAllUser,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
