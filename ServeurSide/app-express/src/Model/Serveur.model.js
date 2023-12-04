const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

/**
 * @desc Modele de la table serveur
 * @typedef Serveur
 * @property {integer} id - Identifiant unique (automatiquement généré)
 * @property {string} nom.required - Nom du serveur
 * @property {string} description - Description du serveur
 * @property {string} lienImage.required - Lien de l'image du serveur (automatiquement généré)
 * @property {string} lienParametre.required - Lien du fichier de configuration du serveur (automatiquement généré)
 * @property {string} lienLog - Lien du fichier de log du serveur (automatiquement généré)
 * @property {string} lienFichierConfiguration - Lien du fichier de configuration du serveur (automatiquement généré)
 *
 */

const Serveur = sequelize.define(
  "serveur",
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
      allowNull: false,
    },
    lienImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lienParametre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lienLog: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lienFichierConfiguration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
