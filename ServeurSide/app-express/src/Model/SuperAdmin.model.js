const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("./User.model");

const Admin = sequelize.define(
  "admin",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


Admin.hasOne(UserModel);

Admin.sync({ alter: true });

module.exports = Admin;
