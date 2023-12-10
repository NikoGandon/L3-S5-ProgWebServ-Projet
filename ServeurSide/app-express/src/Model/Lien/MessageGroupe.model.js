const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("../User.model");
const GroupeModel = require("../Groupe.model");

const MessageGroupe = sequelize.define(
  "MessageGroupe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    texte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

UserModel.belongsToMany(GroupeModel, { through: MessageGroupe });
GroupeModel.HasMany(UserModel, { through: MessageGroupe });

module.exports = MessageGroupe;