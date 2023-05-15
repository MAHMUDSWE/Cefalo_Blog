/**
 * Module representing DTOs for signup requests
 * @module Models/blog
 */

const { DataTypes } = require('sequelize');
const User = require('./user.model');
const { sequelize } = require('../configs/sequelize.config');

/**
 * @typedef {Object} BlogModel
 * @property {string} blogid - The unique ID of the blog.
 * @property {string} userid - The user ID of the author of the blog.
 * @property {string} title - The title of the blog.
 * @property {string} content - The content of the blog.
 * @property {string} [status] - The status of the blog.
 */

/**
 * The Sequelize model for the 'tbl_blog' table.
 *
 * @type {sequelize.Model<BlogModel>}
 */

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

Blog.belongsTo(User, { onDelete: "CASCADE", foreignKey: "userid", as: "user" });
User.hasMany(Blog, { onDelete: "CASCADE", foreignKey: "userid", as: "blog" });


module.exports = Blog;

