const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

/**
 * @desc Modele de la table OAuth2
 * @property {integer} id - Identifiant unique (automatiquement généré)
 * @property {string} clientId.required - Identifiant du client
 * @property {string} clientSecret.required - Mot de passe du client
 * @property {string} redirectUri.required - Lien de redirection du client
 * 
*/

const OAuth2 = sequelize.define(
  "OAuth2",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    redirectUri: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "OAuth2",
    timestamps: false,
  }
)

module.exports = OAuth2;