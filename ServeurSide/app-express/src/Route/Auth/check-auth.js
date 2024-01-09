const express = require("express");
const routerCheckAuth = express.Router();

const { checkToken } = require("../../Middleware/AuthToken");

/**
 * @swagger
 * /Auth/check-auth:
 * get:
 * description: Vérifie si l'utilisateur est connecté
 * responses:
 * 200:
 * description: L'utilisateur est connecté
 * 500:
 * description: le token est invalide
 */

routerCheckAuth.get("/", (req, res) => {
  const token = checkToken(req);
  if (token == -1) {
    return res
      .status(500)
      .json({ authenticated: false, admin: false, message: "Token invalide." });
  }
  return res.status(200).json({ authenticated: token > 0, admin: token == 2 });
});

module.exports = routerCheckAuth;
