const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const Groupe = require("../Groupe.model");
const User = require("../User.model");

/**
 * @desc Modele de la table membre_groupe liant les utilisateurs aux groupes
 * @property {integer} Userid - Identifiant unique de l'utilisateur
 * @property {integer} Groupeid - Identifiant unique du groupe
 *
 */

const MembreGroupe = sequelize.define(
  "MembreGroupe",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    groupeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(MembreGroupe, { foreignKey: "userId" });
//Groupe.hasMany(MembreGroupe, { foreignKey: "groupeId" });

MembreGroupe.belongsTo(User, { foreignKey: "userId", as: "utilisateur" });
//MembreGroupe.belongsTo(Groupe, { foreignKey: "groupeId", as: "groupe" });

MembreGroupe.sync();

module.exports = MembreGroupe;
