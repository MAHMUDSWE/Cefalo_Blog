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
        allowNull: true
    }
}, {
    tableName: 'tbl_blog',
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

User.hasMany(Blog, { onDelete: "CASCADE", foreignKey: "userid", as: "blog" });
Blog.belongsTo(User, { onDelete: "CASCADE", foreignKey: "userid", as: "user" });


module.exports = Blog;

