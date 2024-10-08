const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const ServeurModel = require("./Serveur.model");
/**
 * @desc Modele de la table salon
 * @typedef Salon
 * @property {integer} id - Identifiant unique (automatiquement généré)
 * @property {string} nom.required - Nom du salon
 * @property {string} description - Description du salon
 *
 */

const Salon = sequelize.define(
  "salon",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idServeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Salon.belongsTo(ServeurModel, {
  foreignKey: "idServeur",
  as: "serveur",
});

Salon.sync();

module.exports = Salon;
