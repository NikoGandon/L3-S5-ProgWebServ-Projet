const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const User = require("../User.model");

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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userOAuthId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

OAuth2.belongsTo(User, { foreignKey: "userId" });

OAuth2.sync();
module.exports = OAuth2;
