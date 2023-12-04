const sequelize = require("../../Config/db");
const { DataTypes } = require('sequelize');

const GroupeModel = require('../Groupe.model');
const UserModel = require('../User.model');

/**
 * @desc Modele de la table membre_groupe liant les utilisateurs aux groupes
 * @property {integer} Userid - Identifiant unique de l'utilisateur
 * @property {integer} Groupeid - Identifiant unique du groupe
 * 
 */

const MembreGroupe = sequelize.define('membreGroupe', {
    Userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Groupeid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

UserModel.belongsToMany(GroupeModel, { through: MembreGroupe });
GroupeModel.belongsToMany(UserModel, { through: MembreGroupe });