const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const MessageModel = require("../Message.model");
const UtilisateurModel = require("../Utilisateur.model");

/**
 * @desc Modele de la table messagePrivee
 * @typedef MessagePrivee
 * @property {integer} id - Identifiant unique (automatiquement généré)
 * @property {string} contenu.required - Contenu du message
 * @property {string} date.required - Date d'envoi du message
 * @property {integer} id_utilisateur1.required - Identifiant de l'utilisateur 1
 *
 */

const MessagePrivee = sequelize.define(
  "messagePrivee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contenu: {
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

MessagePrivee.belongsTo(UtilisateurModel, { through: MessageModel });
UtilisateurModel.hasMany(MessagePrivee, { through: MessageModel });