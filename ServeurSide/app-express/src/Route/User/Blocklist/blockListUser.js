const express = require("express");
const blocklistRouteur = express.Router();

/**
 * @swagger
 * /User/blocklist:
 * get:
 * description: Récupère la blocklist
 * responses:
 *
 */

blocklistRouteur.get("/", () => {});

/**
 * @swagger
 * /User/blocklist:
 * post:
 * description: Ajoute un utilisateur à sa blocklist
 * responses:
 *
 */

blocklistRouteur.post("/", () => {});

/**
 * @swagger
 * /User/blocklist:
 * delete:
 * description: Débloque un utilisateur de sa blocklist
 * responses:
 *
 */

blocklistRouteur.delete("/", () => {});

module.exports = blocklistRouteur;
