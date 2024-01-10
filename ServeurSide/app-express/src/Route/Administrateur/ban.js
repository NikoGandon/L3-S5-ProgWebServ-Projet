const express = require("express");
const banRoute = express.Router();

const {
  banUser,
  getAllBanUser,
  unbanUser,
} = require("../../Logic/Admin/admin");

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
  if (!req.body.idUser)
    return res.status(400).json({ error: "Veuillez spécifier un ID." });

  banUser(req, res);
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
  getAllBanUser(req, res);
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
  if (!req.body.idUser)
    return res.status(400).json({ error: "Veuillez spécifier un ID." });

  unbanUser(req, res);
});

module.exports = banRoute;
