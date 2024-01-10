const express = require("express");
const AdministrateurRoute = express();

const BanRoute = require("./ban");
const statsRoute = require("./stats");

const { verifyAdminToken } = require("../../Middleware/AuthToken");

/**
 * @swagger
 * /administrateur/isAdmin:
 * get:
 * description: Utilisé pour vérifier si l'utilisateur est admin
 * responses:
 * 200:
 * description: L'utilisateur est admin
 * 
 */
AdministrateurRoute.get("/isAdmin", verifyAdminToken, (req, res) => {
  return res.status(200).json({ estAdmin: true });
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

AdministrateurRoute.get("/", verifyAdminToken, (req, res) => {
  return res.status(200).json({
    message: "Route non terminée.",
  });
});

AdministrateurRoute.use("/ban", verifyAdminToken, BanRoute);

AdministrateurRoute.get("/stats", verifyAdminToken, statsRoute);

module.exports = AdministrateurRoute;
