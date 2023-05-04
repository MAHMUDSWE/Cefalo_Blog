const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const authRepository = require("../respositories/auth.repository");
const authUtils = require("../utils/functions/auth.util");

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

const userLogin = async (loginCredentials) => {

    const user = await authRepository.userLogin(loginCredentials);

    const token = authUtils.generateAccessToken(user.userid);

    return token;
}

module.exports = {
    userRegistration,
    userLogin
}