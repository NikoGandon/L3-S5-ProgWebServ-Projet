const { sequelize } = require("../../Config/db");

const { DataTypes } = require("sequelize");

const UserModel = require("../User.model");

/**
 * @desc Modele de la table User_User pour les messages privés
 * @typedef UserUser
 * @property {integer} id_user.required - Identifiant de l'utilisateur
 * @property {integer} id_user.required - Identifiant de l'utilisateur
 */

const UserUser = sequelize.define(
  "User_User",
  {
    idCouple: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);


UserModel.belongsToMany(UserModel, { through: UserUser, as: 'User1', foreignKey: 'id_user1' });
UserModel.belongsToMany(UserModel, { through: UserUser, as: 'User2', foreignKey: 'id_user2' });

UserUser.sync({alter: true});

module.exports = UserUser;