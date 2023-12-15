const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("./User.model");
const ServeurModel = require("./Serveur.model");

/**
 * @desc Modele de la table BanniServeur
 * @typedef BanniServeur
 * @property {integer} idUser - Identifiant de l'utilisateur banni
 * @property {string} idServeur - Identifiant du serveur
 */

const BanniServeur = sequelize.define(
  "banniServeur",
  {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idServeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    timestamps: false
  }
);

BanniServeur.belongsTo(UserModel, {
  foreignKey: "idUser",
  as: "user",
});

BanniServeur.belongsTo(ServeurModel, {
  foreignKey: "idServeur",
  as: "serveur",
});

BanniServeur.sync();

module.exports = BanniServeur;
