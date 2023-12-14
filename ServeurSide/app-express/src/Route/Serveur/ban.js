const express = require("express");
const banRoute = express.Router();

/**
 * @swagger
 * /serveur/ban:
 * get:
 * description: Utilisé pour bannir un utilisateur du serveur
 * responses:
 *
 *
 */

banRoute.get("/", (req, res) => {
  res.send("Récupération de la liste des bannis");
});

/**
 * @swagger
 * /serveur/ban:
 * post:
 * description: Utilisé pour bannir un utilisateur du serveur
 * responses:
 *
 *
 */

banRoute.post("/", (req, res) => {
  res.send("Bannissement d'un utilisateur");
});

/**
 * @swagger
 * /serveur/ban:
 * delete:
 * description: Utilisé pour débannir un utilisateur du serveur
 * responses:
 *
 *
 */

banRoute.delete("/", (req, res) => {
  res.send("Débannissement d'un utilisateur");
});

module.exports = banRoute;