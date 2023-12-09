const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const ServeurModel = require("../Serveur.model");

/**
 * @desc Modele de la table codeServeur liant les codes d'accès aux serveurs (un serveur a x codes d'accès)
 * @property {integer} id - Identifiant unique du code
 * @property {string} code - Code d'accès au serveur
 * @property {integer} Serveurid - Identifiant unique du serveur
 */

const CodeServeur = sequelize.define(
  "CodeServeur",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

ServeurModel.hasMany(CodeServeur);
CodeServeur.belongsTo(ServeurModel);