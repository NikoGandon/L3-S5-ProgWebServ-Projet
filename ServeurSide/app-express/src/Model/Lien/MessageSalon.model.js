const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("../User.model");
const SalonModel = require("../Salon.model");

/**
 * @desc Modele de la table messageSalon liant les messages aux salons
 * @property {integer} Userid - Identifiant unique du message
 */

const MessageSalon = sequelize.define(
  "MessageSalon",
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

SalonModel.belongsToMany(UserModel, { through: MessageSalon });
