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

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
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
    getUserByEmail,
    updateUserByUsername,
    deleteUserByUsername
};
