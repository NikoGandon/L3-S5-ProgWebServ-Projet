const sequelize = require("../Config/db");

const MessageModel = require("../Message.model");

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
  "MessagePrivee",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MessagePrivee.belongsToMany(GroupeModel, { through: MessageGroupe });
GroupePrivee.belongsToMany(MessageModel, { through: MessageGroupe });

module.exports = MessagePrivee;