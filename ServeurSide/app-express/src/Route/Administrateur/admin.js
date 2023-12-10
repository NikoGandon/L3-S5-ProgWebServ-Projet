const express = require("express");
const routerAdministrateur = express.Router();

/**
 * @swagger
 * /administrateur:
 * get:
 * description: Utilisé pour récupérer l'interface d'un administrateur
 */

routerAdministrateur.get("/", (req, res) => {
  res.send("administrateur");
});

module.exports = routerAdministrateur;