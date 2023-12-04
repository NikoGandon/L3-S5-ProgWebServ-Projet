const sequelize = require("../../Config/db");
const { DataTypes } = require("sequelize");

const ServeurModel = require("../Serveur.model");
const UserModel = require("../User.model");

/**
 * @desc Modele de la table membre_serveur liant les utilisateurs aux serveurs
 * @property {integer} Userid - Identifiant unique de l'utilisateur
 * @property {integer} Serveurid - Identifiant unique du serveur
 * 
 */

const MembreServeur = sequelize.define("membreServeur", {
    Userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Serveurid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

UserModel.belongsToMany(ServeurModel, { through: MembreServeur });
ServeurModel.belongsToMany(UserModel, { through: MembreServeur });