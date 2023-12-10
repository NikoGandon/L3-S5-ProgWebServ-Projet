const express = require("express");
const InviteRoute = express();

/**
 * @swagger
 * /serveur/invite:
 * post:
 * description: Utilisé pour créer un lien d'invitation
 * responses:
 *
 *
 */

routerServeur.post("/", (req, res) => {
  res.send("Création d'un lien d'invitation");
});

/**
 * @swagger
 * /serveur/invite:
 * get:
 * description: Utilisé pour récupérer tous les liens d'invitations
 * responses:
 *
 *
 */

routerServeur.get("/", (req, res) => {
  res.send("Récupération de tous les liens d'invitations");
});

/**
 * @swagger
 * /serveur/invite:
 * delete:
 * description: Utilisé pour supprimer un lien d'invitation
 * responses:
 *
 *
 */

routerServeur.delete("/", (req, res) => {
  res.send("Suppression d'un lien d'invitation");
});

module.exports = InviteRoute;
