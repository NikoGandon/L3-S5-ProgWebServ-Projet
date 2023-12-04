const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const ServeurModel = require("../Serveur.model");
const UserModel = require("../User.model");

/**
 * @desc Modele de la table membre_serveur liant les utilisateurs aux serveurs
 * @property {integer} Userid - Identifiant unique de l'utilisateur
 * @property {integer} Serveurid - Identifiant unique du serveur
 * @property {date} dateInscription - Date d'inscription de l'utilisateur au serveur
 *
 */

const MembreServeur = sequelize.define(
  "membreServeur",
  {
    dateInscription: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

UserModel.belongsToMany(ServeurModel, { through: MembreServeur });
ServeurModel.hasMany(UserModel, { through: MembreServeur });