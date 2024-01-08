const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("../User.model");
const AdminModel = require("../SuperAdmin.model");

/**
 * @desc Modele de la table BanniAdmin
 * @typedef BanniAdmin
 * @property {integer} idUser - Identifiant de l'utilisateur banni
 * @property {string} idAdmin - Identifiant de l'admin qui a banni
 * @property {string} date - Date du ban
 * @property {string} raison - Raison du ban
 */

const BanniSite = sequelize.define(
  "banniSite",
  {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    idAdmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: AdminModel,
        key: "userId",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    raison: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

BanniSite.sync();

module.exports = BanniSite;
