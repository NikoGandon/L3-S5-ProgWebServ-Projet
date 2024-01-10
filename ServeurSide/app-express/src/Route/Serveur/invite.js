const express = require("express");
const InviteRoute = express();
const MembreRoute = require("../../logic/Serveur/AddMembre");

/**
 * @swagger
 * /serveur/invite:
 * post:
 * description: Utilisé pour créer un lien d'invitation
 * responses:
 *
 *
 */

InviteRoute.post("/", (req, res) => {
  MembreRoute.InviteMembre(req, res);
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

InviteRoute.get("/", (req, res) => {
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

InviteRoute.delete("/", (req, res) => {
  res.send("Suppression d'un lien d'invitation");
});

module.exports = InviteRoute;
