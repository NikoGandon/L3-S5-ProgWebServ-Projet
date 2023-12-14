const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const MessageModel = require("../Message/Message.model");
const GroupeModel = require("../Groupe.model");

const MessageGroupe = sequelize.define(
  "MessageGroupe",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MessageModel.belongsToMany(GroupeModel, { through: MessageGroupe });
GroupeModel.belongsToMany(MessageModel, { through: MessageGroupe });

MessageGroupe.sync();

module.exports = MessageGroupe;
