const { UserDTO } = require('../dto/response/user.res.dto');
const userRepository = require('../repositories/user.repository');

const { StatusCode, HttpError } = require('../utils/commonObject.util');
const paginationUtils = require('../utils/pagination.util');

const getAllUser = async (paginationParameter) => {

    const { offset, limit } = paginationUtils.pagination(paginationParameter);

    const { count, rows } = await userRepository.getAllUser(offset, limit);


    if (!rows[0]) {
        return rows
    }
    return {
        users: rows.map((user) => new UserDTO(user)),
        currentPage: paginationUtils.currentPage(offset, limit),
        totalPages: paginationUtils.totalPages(count, limit),
        totalUsers: count
    };
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
