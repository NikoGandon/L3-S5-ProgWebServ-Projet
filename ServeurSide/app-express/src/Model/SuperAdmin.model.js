const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("./User.model");

const Admin = sequelize.define(
  "admin",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Admin.hasOne(UserModel);

Admin.sync({ alter: true });

module.exports = Admin;
