const userRepository = require('../respositories/user.repository');

const getAllUser = async () => {
    const users = await userRepository.getAllUser();
    return users;
}

const getUserByUsername = async (username) => {
    const user = await userRepository.getUserByUsername(username);
    
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
