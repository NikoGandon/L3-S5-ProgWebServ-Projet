const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const MessageModel = require("./Message.model");
const UserModel = require("../User.model");

/**
 * @desc Modele de la table messagePrive liant les messages prives aux utilisateurs
 * @property {integer} id - Identifiant unique du couple message utilisateur A et B
 * @property {string} idMessage - Identifiant du message
 * @property {string} idAuteur - Identifiant de l'auteur du message
 * @property {string} idDestinataire - Identifiant du destinataire du message
 * 
 */

const MessagePrive = sequelize.define(
  "MessagePrive",
  {
    idMessagePrive: {
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

MessagePrive.belongsTo(MessageModel, { foreignKey: "idMessage" });
MessagePrive.belongsTo(UserModel, { foreignKey: "idAuteur", as: "Auteur" });
MessagePrive.belongsTo(UserModel, {
  foreignKey: "idDestinataire",
  as: "Destinataire",
});

MessagePrive.prototype.getContenu = function () {
  return this.Message ? this.Message.contenu : null;
};

MessagePrive.prototype.getDate = function () {
  return this.Message ? this.Message.date : null;
};


MessagePrive.sync({ alter: true });

module.exports = MessagePrive;
