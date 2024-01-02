const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const MessageModel = require("./Message.model");
const SalonModel = require("../Salon.model");

/**
 * @desc Modele de la table messageSalon liant les messages aux salons
 * @property {integer} id - Identifiant unique du couple message salon
 * @property {string} idMessage - Identifiant du message
 * @property {string} idSalon - Identifiant du salon
 *
 */

const MessageSalon = sequelize.define(
  "MessageSalon",
  {
    idMessageSalon: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idMessage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: MessageModel,
        key: "id",
      },
    },
    idSalon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SalonModel,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MessageModel.belongsToMany(SalonModel, {
  through: MessageSalon,
  foreignKey: "idMessage",
});
SalonModel.belongsToMany(MessageModel, {
  through: MessageSalon,
  foreignKey: "idSalon",
});

MessageSalon.sync();

module.exports = MessageSalon;
