const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    verifyPassword
}