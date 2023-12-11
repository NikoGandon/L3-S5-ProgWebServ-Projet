const express = require("express");
const { modes } = require("tar");
const banRoute = express;

/**
 * @swagger
 * /administrateur/ban:
 * post:
 * description: Utilisé pour bannir un utilisateur
 * responses:
 *
 *
 */

banRoute.post("/", (req, res) => {
  res.send("Bannissement d'un utilisateur");
});

/**
 * @swagger
 * /administrateur/ban:
 * get:
 * description: Utilisé pour récupérer tous les bannis
 * responses:
 *
 *
 */

banRoute.get("/", (req, res) => {
  res.send("Récupération de tous les bannis");
});

/**
 * @swagger
 * /administrateur/ban:
 * delete:
 * description: Utilisé pour débannir un utilisateur
 * responses:
 *
 *
 */

banRoute.delete("/", (req, res) => {
  res.send("Débannissement d'un utilisateur");
});

module.exports = banRoute;