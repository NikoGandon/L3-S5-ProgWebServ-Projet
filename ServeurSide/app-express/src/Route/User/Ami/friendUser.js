const express = require("express");
const friendRouteur = express.Router();
const {getFriend,addFriend} = "../../Logic/Utilisateur/friend";
/**
 * @swagger
 * /User/friend:
 * get:
 * description: Récupère la liste des amis
 * responses:
 *
 */

friendRouteur.get("/", (req,res) => {getFriend(req,res)});

/**
 * @swagger
 * /User/friend:
 * post:
 * description: Ajoute un ami
 * responses:
 *
 */

friendRouteur.post("/", (req,res) => {addFriend(req,res)});

/**
 * @swagger
 * /User/friend:
 * delete:
 * description: Supprime un ami
 * responses:
 *
 */

friendRouteur.delete("/", () => {});

module.exports = friendRouteur;
