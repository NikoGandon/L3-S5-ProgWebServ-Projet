const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

module.exports = admin;
