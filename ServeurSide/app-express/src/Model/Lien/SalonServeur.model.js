const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const SalonModel = require("../Salon.model");
const ServeurModel = require("../Serveur.model");

/**
 * @desc Modele de la table salon_serveur
 * @typedef SalonServeur
 * @property {integer} id_serveur.required - Identifiant du serveur
 * @property {integer} id_salon.required - Identifiant du salon
 *
 */

const SalonServeur = sequelize.define(
  "SalonServeur",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

SalonModel.belongsTo(ServeurModel, { through: SalonServeur });
ServeurModel.hasMany(SalonModel, { through: SalonServeur });

SalonServeur.sync({alter: true});

module.exports = SalonServeur;