const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");

/**
 * @desc Modele de la table user
 * @typedef Utilisateur
 * @property {integer} id - Identifiant unique (automatiquement généré)
 * @property {string} username.required - Nom d'utilisateur
 * @property {string} email.required - Adresse email
 * @property {string} password.required - Mot de passe
 * @property {string} lienPP.required - Lien de la photo de profil (automatiquement généré)
 * @property {string} bio - Biographie de l'utilisateur
 *
 */

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lienPP: {
      type: DataTypes.STRING,
      defaultValue: function () {
        const rand = Math.floor(Math.random() * 3) + 1;
        return "ressources/PhotoProfil/Base/" + rand + ".png";
      },
      allowNull: false,
    },

    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lienParametre: {
      type: DataTypes.STRING,
      defaultValue: function () {
        return "ressources/Parametre/User/";
      },
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.beforeCreate(async (user, options) => {
  const generatedId = await user.getDataValue("id");
  user.lienParametre = "ressources/Parametre/User/" + generatedId + ".json";
});

User.sync();

module.exports = User;