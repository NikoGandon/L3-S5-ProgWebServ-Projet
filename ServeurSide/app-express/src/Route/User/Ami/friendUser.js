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

friendRouteur.get("/", () => {});

/**
 * @swagger
 * /User/friend:
 * post:
 * description: Ajoute un ami
 * responses:
 *
 */

friendRouteur.post("/", () => {});

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
