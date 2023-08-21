const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/sequelize.config');

const OAuth = sequelize.define('tbl_oauth', {
    oauthid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    userid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'tbl_oauth',
    timestamps: false
});

module.exports = OAuth;