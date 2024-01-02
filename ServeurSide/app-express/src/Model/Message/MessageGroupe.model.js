const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const MessageModel = require("./Message.model");
const GroupeModel = require("../Groupe.model");
const UserModel = require("../User.model");


/**
 * @desc Modele de la table messageGroupe liant les messages aux groupes
 * @property {integer} id - Identifiant unique du couple message groupe
 * @property {string} idMessage - Identifiant du message
 * @property {string} idGroupe - Identifiant du groupe
 * @property {string} idAuteur - Identifiant de l'auteur du message
 *  
 */

const MessageGroupe = sequelize.define(
  "MessageGroupe",
  {
    idMessageGroupe: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MessageGroupe.belongsTo(MessageModel, { foreignKey: "idMessage" });
MessageGroupe.belongsTo(GroupeModel, { foreignKey: "idGroupe" });
MessageGroupe.belongsTo(UserModel, { foreignKey: "idAuteur", as: "Auteur"});

MessageModel.belongsToMany(GroupeModel, { through: MessageGroupe, foreignKey: 'idMessage' });
GroupeModel.belongsToMany(MessageModel, { through: MessageGroupe, foreignKey: 'idGroupe' });

MessageGroupe.sync({ alter: true });

module.exports = MessageGroupe;
