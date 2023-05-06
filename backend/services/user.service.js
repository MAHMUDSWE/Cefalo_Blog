const userRepository = require('../respositories/user.repository');
const HttpError = require('../utils/objects/httpError.object');
const StatusCode = require('../utils/objects/statusCode.object');



const getAllUser = async () => {
    const users = await userRepository.getAllUser();
    return users;
}

const getUserByUsername = async (username) => {
    const user = await userRepository.getUserByUsername(username);

    return user;
}

const updateUser = async (userid, updateFields) => {

    const user = await userRepository.getUserById(userid);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`);
    }

    return await userRepository.updateUser(user, updateFields);
}

const deleteUser = async (userid) => {

    const user = await userRepository.getUserById(userid);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`);
    }

    const result = await userRepository.deleteUser(userid);
    return result;
}

module.exports = {
    getAllUser,
    getUserByUsername,
    updateUser,
    deleteUser
};
