const { v4: uuidv4 } = require('uuid');

const authRepository = require("../respositories/auth.repository");
const userRepository = require("../respositories/user.repository");

const authUtils = require("../utils/functions/auth.util");
const bcryptUtils = require("../utils/functions/bcrypt.util");

const HttpError = require('../utils/objects/httpError.object');
const StatusCode = require('../utils/objects/statusCode.object');

const { UserDTO } = require('../dto/response/user.res.dto');

const userRegistration = async (signupReqDto) => {

    const { email, username, password } = signupReqDto;

    if (await userRepository.getUserByEmail(email)) {

        throw new HttpError(StatusCode.CONFLICT, 'Email already in use')
    }

    if (await userRepository.getUserByUsername(username)) {
        throw new HttpError(StatusCode.CONFLICT, 'Username already in use')
    }

    const hashedPassword = await bcryptUtils.hashPassword(password);

    const newUser = {
        userid: uuidv4(),
        ...signupReqDto,
        password: hashedPassword
    }

    const user = await authRepository.userRegistration(newUser);

    return new UserDTO(user);
}

const userLogin = async (loginCredentials) => {

    const { username, password } = loginCredentials;

    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new HttpError(401, 'Invalid username or password');
    }

    const isPasswordValid = await bcryptUtils.verifyPassword(password, user.password);

    if (!isPasswordValid) {
        throw new HttpError(401, 'Invalid username or password');
    }

    const token = authUtils.generateAccessToken(user.userid);

    return token;
}

module.exports = {
    userRegistration,
    userLogin
}