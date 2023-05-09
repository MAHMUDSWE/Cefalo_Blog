const { UserDTO } = require('../dto/response/user.res.dto');
const userRepository = require('../respositories/user.repository');

const { StatusCode, HttpError } = require('../utils/commonObject.util');

const getAllUser = async () => {
    const users = await userRepository.getAllUser();
    if (!users[0]) {
        return users
    }
    return users.map((user) => new UserDTO(user));
}

const getUserByUsername = async (username) => {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, "User not found");
    }
    return new UserDTO(user);
}

const updateUser = async (userid, updateFields) => {

    const user = await userRepository.getUserById(userid);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`);
    }

    const updatedUser = await userRepository.updateUser(user, updateFields);

    return new UserDTO(updatedUser);
}

const deleteUser = async (userid) => {

    const user = await userRepository.getUserById(userid);

    if (!user) {
        throw new HttpError(StatusCode.NOT_FOUND, `User with id ${userid} not found`);
    }

    await userRepository.deleteUser(userid);

}

module.exports = {
    getAllUser,
    getUserByUsername,
    updateUser,
    deleteUser
};
