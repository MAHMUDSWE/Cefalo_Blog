const { DataTypes } = require('sequelize');
const User = require('./user.model');
const { sequelize } = require('../configs/sequelize.config');

const Blog = sequelize.define('Blog', {
    blogid: {
        type: DataTypes.STRING(150),
        primaryKey: true,
        allowNull: false
    },
    userid: {
        type: DataTypes.STRING(150),
        unique: false,
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
    timestamps: false, // <-- disable createdAt and updatedAt columns
    indexes: [{
        unique: true,
        fields: ['userid', 'blogid']
    }],
    foreignKeys: [{
        name: 'fk_blog_user_id',
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: User,
            key: 'userid'
        }
    }]
});

User.hasMany(Blog, { onDelete: "CASCADE", foreignKey: "userid" });
Blog.belongsTo(User, { onDelete: "CASCADE", foreignKey: "userid" });

// (async () => {
//     try {
//         await sequelize.sync();
//         console.log('Blog Models have been synced successfully.');
//     } catch (error) {
//         console.error('Unable to sync the models', error);
//     }
// })();

module.exports = Blog;
