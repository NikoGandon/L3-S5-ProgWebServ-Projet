const express = require("express");
const friendRouteur = express.Router();

/**
 * @swagger
 * /User/friend:
 * get:
 * description: Récupère la liste des amis
 * responses:
 *
 */

routeurUser.get("/friend", AmiRoute);

/**
 * @swagger
 * /User/friend:
 * post:
 * description: Ajoute un ami
 * responses:
 *
 */

routeurUser.post("/friend", AmiRoute);

/**
 * @swagger
 * /User/friend:
 * delete:
 * description: Supprime un ami
 * responses:
 *
 */

routeurUser.delete("/friend", AmiRoute);

module.exports = friendRouteur;
