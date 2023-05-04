const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/sequelize.config');

const Blog = sequelize.define('Blog', {
    blogid: {
        type: DataTypes.STRING(150),
        primaryKey: true,
        allowNull: false
    },
    userid: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(69),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    createtime: {
        type: DataTypes.DATE(6),
        allowNull: false
    },
    updatetime: {
        type: DataTypes.DATE(6),
        allowNull: false
    }
}, {
    tableName: 'tbl_blog',
    timestamps: false // <-- disable createdAt and updatedAt columns
});

// (async () => {
//     try {
//         await sequelize.sync();
//         console.log('Blog Models have been synced successfully.');
//     } catch (error) {
//         console.error('Unable to sync the models', error);
//     }
// })();

module.exports = Blog;
