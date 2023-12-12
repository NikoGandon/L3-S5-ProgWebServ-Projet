const express = require("express");
const AdministrateurRoute = express();

const BanRoute = require("./ban");
const statsRoute = require("./stats");

/**
 * @swagger
 * /administrateur:
 * get:
 * description: Utilisé pour récupérer l'accueil de l'utilisateur
 * responses:
 *
 *
 */

AdministrateurRoute.get("/", (req, res) => {
  res.send("Accueil de l'administrateur");
});

AdministrateurRoute.use("/ban", BanRoute);

AdministrateurRoute.get("/stats", statsRoute);

module.exports = AdministrateurRoute;