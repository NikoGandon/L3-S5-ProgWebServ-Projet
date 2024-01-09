const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");


const UserModel = require("../User.model");

const FriendUser = sequelize.define(
  "FriendUser",
  {},
  {
    timestamps: false,
    freezeTableName: true,
  }
);

UserModel.belongsToMany(UserModel, {
  through: FriendUser,
  as: "friend",
  foreignKey: "userId",
  otherKey: "friendId"
});

FriendUser.sync({ alter: true });

module.exports = FriendUser;