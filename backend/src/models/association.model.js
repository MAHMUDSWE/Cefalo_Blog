const Blog = require("./blog.model");
const User = require("./user.model");
const OAuth = require("./oAuth.model");
const UserProfile = require("./userProfile.model");

Blog.belongsTo(User, { onDelete: "CASCADE", foreignKey: "userid", as: "user" });
User.hasMany(Blog, { onDelete: "CASCADE", foreignKey: "userid", as: "blog" });

OAuth.belongsTo(User, { onDelete: "CASCADE", foreignKey: "userid", as: "user" });
User.hasOne(OAuth, { onDelete: "CASCADE", foreignKey: "userid", as: "oauth" });

UserProfile.belongsTo(User, { onDelete: "CASCADE", foreignKey: "userid", as: "user" });
User.hasOne(UserProfile, { onDelete: "CASCADE", foreignKey: "userid", as: "profile" });


