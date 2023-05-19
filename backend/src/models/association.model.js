const Blog = require("./blog.model");
const User = require("./user.model");


Blog.belongsTo(User, { onDelete: "CASCADE", foreignKey: "userid", as: "user" });
User.hasMany(Blog, { onDelete: "CASCADE", foreignKey: "userid", as: "blog" });

