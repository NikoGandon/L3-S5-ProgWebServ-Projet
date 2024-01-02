const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

const UserModel = require("./User.model");

/**
 * @desc Modele de la table groupe
 * @typedef Groupe
 * @property {integer} id - Identifiant unique (automatiquement généré)
 * @property {string} nom.required - Nom du groupe
 * @property {string} lienImage.required - Lien de l'image du groupe (automatiquement généré)
 * @property {string} lienFichierConfiguration - Lien du fichier de configuration du groupe (automatiquement généré)
 *
 */

const Groupe = sequelize.define(
  "groupe",
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
    lienImage: {
      type: DataTypes.STRING,
      defaultValue: function () {
        const rand = Math.floor(Math.random() * 3) + 1;
        return "ressources/PhotoProfil/Base/" + rand + ".png";
      },
      allowNull: false,
    },
    idCreateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Groupe.belongsTo(UserModel, { foreignKey: "idCreateur", as: "createur" });

Groupe.sync();

module.exports = Groupe;
