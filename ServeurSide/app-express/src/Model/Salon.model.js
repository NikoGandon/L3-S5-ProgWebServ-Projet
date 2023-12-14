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
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

<<<<<<< e069523a71842b8596089ff2bc22124206ace957
Salon.belongsTo(ServeurModel, {
  foreignKey: "idServeur",
  as: "serveur",
});

Salon.sync({ force: false}).then(() => {
=======
Salon.sync({ alter: true}).then(() => {
>>>>>>> 1c8e9910666a9bfd5086f1f2f1017d5cf021cc74
  console.log("Table Salon created");
}).catch((err) => {
  console.log(err);
});

module.exports = Salon;
