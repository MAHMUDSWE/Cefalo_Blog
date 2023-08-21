const { v4: uuidv4 } = require('uuid');
const { getUserByOAuthId, getUserNameCount } = require("./user.service");
const { createOAuthUser } = require('../repositories/user.repository');

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

    const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.email && profile.emails.length > 0 ? profile.emails[0].value : null,
        username: generatedUsername,
        provider: profile.provider,
        userid: uuidv4()
    };


    const createNewUser = createOAuthUser(newUser);

    done(null, createNewUser);
};

module.exports = { createUserFromOAuthProfile };