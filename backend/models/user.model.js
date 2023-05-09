const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/sequelize.config');

const User = sequelize.define('tbl_user', {
    userid: {
        type: DataTypes.STRING(150),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(69),
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(24),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(69),
        allowNull: false
    }
});

module.exports = User;
