const { v4: uuidv4 } = require('uuid');
const authUtils = require("../utils/auth.util");

const { createOAuthUser, getUserByOAuthId, getUserNameCount } = require('../repositories/user.repository');
const userRepository = require("../repositories/user.repository");
const { StatusCode, HttpError } = require('../utils/commonObject.util');

const createUserFromOAuthProfile = async (profile, done) => {

    const existingUser = await getUserByOAuthId(profile.id);

    if (existingUser) {
        return done(null, existingUser);
    }

    let generatedUsername = profile.displayName.replace(/\s+/g, '').toLowerCase();

    const numOfExistingGeneratedUsername = await getUserNameCount(generatedUsername);

    if (numOfExistingGeneratedUsername > 0) {
        generatedUsername = `${generatedUsername}${numOfExistingGeneratedUsername}`;
    }

    if (await userRepository.getUserByEmail(profile.emails[0].value)) {

        throw new HttpError(StatusCode.CONFLICT, 'Email already in use by another account')
    }

    const newUser = {
        oauthid: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        username: generatedUsername,
        provider: profile.provider,
        userid: uuidv4()
    };


    const createdNewUser = await createOAuthUser(newUser);

    return done(null, createdNewUser);
};

const oauthCallBack = (req, res) => {
    if (!req.user) {
        return res.status(StatusCode.UNAUTHORIZED).json({
            message: 'User not authenticated'
        });
    }
    const token = authUtils.generateAccessToken(req.user.userid);

    authUtils.setTokenToHeader(token, res);

    return token;
}



module.exports = {
    createUserFromOAuthProfile,
    oauthCallBack
};