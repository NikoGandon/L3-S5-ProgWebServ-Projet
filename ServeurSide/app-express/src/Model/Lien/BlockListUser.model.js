const { Sequelize } = require("../../Config/db");

const UserModel = require("../User.model");

const BlockListUser = Sequelize.define(
  "BlockListUser",
  {},
  {
    timestamps: false,
    freezeTableName: true,
  }
);

UserModel.belongsToMany(UserModel, {
  through: BlockListUser,
  as: "blockList",
  foreignKey: "userId",
  otherKey: "blockedId",
});

BlockListUser.sync({ alter: true });

module.exports = BlockListUser;