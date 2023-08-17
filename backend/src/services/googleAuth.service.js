// Import the user repository
const userRepository = require('../repositories/userRepository');

exports.createUserFromGoogleProfile = (profile) => {
    const existingUser = userRepository.findUserByGoogleId(profile.id);

    if (existingUser) {
        return existingUser;
    }

    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        // You can add more profile data here
    };

    userRepository.createUser(newUser);
    return newUser;
};
