const sequelize = require("../Config/db");
const { DataTypes } = require("sequelize");

/**
 * @desc Modele des messages
 * @typedef Message
 * @property {integer} id - Identifiant unique (automatiquement généré)
 * @property {string} contenu.required - Contenu du message
 * @property {date} date.required - Date d'envoi du message
 * @property {date} updateAt - Date de la dernière modification du message
 * @property {integer} Userid.required - Identifiant de l'utilisateur ayant envoyé le message
 *  
 */

const Message = sequelize.define(
  "message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contenu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "message",
    timestamps: false,
  }
);