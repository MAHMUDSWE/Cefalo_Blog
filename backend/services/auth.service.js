const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const authRepository = require("../respositories/auth.repository");

const userRegistration = async (newUser) => {

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    newUser = {
        ...newUser,
        password: hashedPassword,
        userid: uuidv4()
    }

    const user = await authRepository.userRegistration(newUser);
    return user;
}

module.exports = {
    userRegistration,
}