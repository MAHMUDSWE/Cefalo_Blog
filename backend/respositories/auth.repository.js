const User = require('../models/user.model');
const HttpError = require('../utils/objects/httpError.object');
const StatusCode = require('../utils/objects/statusCode.object');

const bcrypt = require('bcrypt');

const userRegistration = async (newUser) => {

    const { userid, name, email, username, password } = newUser;

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
        throw new HttpError(StatusCode.CONFLICT, 'Email already in use')
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
        throw new HttpError(StatusCode.CONFLICT, 'Username already in use')
    }

    const user = await User.create({ userid, name, email, username, password });

    return user;

}

const userLogin = async (loginCredentials) => {

    const { username, password } = loginCredentials;

    const user = await User.findOne({
        where: { username },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!user) {
        throw new HttpError(401, 'Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new HttpError(401, 'Invalid username or password');
    }

    return user;
}

module.exports = {
    userRegistration,
    userLogin
}