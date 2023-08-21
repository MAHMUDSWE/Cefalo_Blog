const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/sequelize.config');

const UserProfile = sequelize.define('tbl_user_profile', {
    profileid: {
        type: DataTypes.STRING(150),
        primaryKey: true,
        allowNull: false
    },
    userid: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    contactinfo: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    bio: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    profilepic: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
}, {
    tableName: 'tbl_user_profile',
    timestamps: false
});

module.exports = UserProfile;