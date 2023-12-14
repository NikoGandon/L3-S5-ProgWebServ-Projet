const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("./User.model");

/**
 * @desc Modele de la table BanniServeur
 * @typedef Groupe
 * @property {integer} idUser - Identifiant de l'utilisateur banni
 * @property {string} idServeur - Identifiant du serveur
 */

const BanniServeur = sequelize.define(
  "banniServeur",
  {
    idMembre: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idServeur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    freezeTableName: true,
    timestamps: false,
  }
);

Groupe.belongsTo(UserModel, { foreignKey: "idCreateur" });

Groupe.sync();

module.exports = BanniServeur;
