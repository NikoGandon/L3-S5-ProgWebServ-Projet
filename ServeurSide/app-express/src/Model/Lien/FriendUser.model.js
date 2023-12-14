const { Sequelize, DataTypes } = require("../../Config/db");

const UserModel = require("../User.model");

const FriendUser = Sequelize.define(
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