const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const MessageModel = require("../Message/Message.model");
const SalonModel = require("../Salon.model");

/**
 * @desc Modele de la table messageSalon liant les messages aux salons
 * @property {integer} Userid - Identifiant unique du message
 * @property {STRING} texte - Texte du message
 * @property {DATE} date - Date du message
 */

const MessageSalon = sequelize.define(
  "MessageSalon",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MessageModel.belongsToMany(SalonModel, { through: MessageSalon });
SalonModel.belongsToMany(MessageModel, { through: MessageSalon });

module.exports = MessageSalon;
