const User = require('../models/user.model');

const userRegistration = async (newUser) => {

    const { userid, name, email, username, password } = newUser;

    return await User.create({ userid, name, email, username, password });
}

const userLogin = async (loginCredentials) => {

    return null;
}

module.exports = {
    userRegistration,
    userLogin
}