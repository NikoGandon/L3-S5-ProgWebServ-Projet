const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("./User.model");
const ServeurModel = require("./Serveur.model");
/**
 * @desc Modele de la table serveur
 * @typedef Serveur
 * @property {string} idUser - Identifiant de l'utilisateur
 * @property {string} idServeur - Identifiant du serveur
 *
 */

const MembreServeur = sequelize.define(
  "membreServeur",
  {
    idUser: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    idServeur: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

  MembreServeur.sync();

module.exports = MembreServeur;