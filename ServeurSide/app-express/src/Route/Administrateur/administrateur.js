const express = require("express");
const AdministrateurRoute = express();

const BanRoute = require("./ban");
const statsRoute = require("./stats");

/**
 * @swagger
 * /administrateur/AccueilAdmin:
 * get:
 * description: Utilisé pour récupérer l'accueil de l'administrateur
 * responses:
 *
 *
 */

AdministrateurRoute.get("/AccueilAdmin", (req, res) => {
  return res.status(200).json({
    message: "Route non terminée.",
  });
});

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
  return res.status(200).json({
    message: "Route non terminée.",
  });
});

AdministrateurRoute.use("/ban", BanRoute);

AdministrateurRoute.get("/stats", statsRoute);

module.exports = AdministrateurRoute;
