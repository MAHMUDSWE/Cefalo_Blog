const User = require('../models/user.model');
const HttpError = require('../utils/objects/httpError.object');
const StatusCode = require('../utils/objects/statusCode.object');

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

module.exports = {
    userRegistration,
}