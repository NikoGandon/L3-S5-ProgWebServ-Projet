const express = require("express");
const routerServeur = express.Router();

/**
 * @swagger
 * /serveur:
 * get:
 * description: Utilisé pour récupérer l'interface du serveur
 * responses:
 *
 */

routerServeur.get("/", (req, res) => {
  res.send("serveur page");
});

/**
 * @swagger
 * /serveur:
 * post:
 * description: Utilisé pour créer un serveur
 * responses:
 *
 *
 */

routerServeur.post("/", (req, res) => {
  res.send("Création du serveur");
});

/**
 * @swagger
 * /serveur:
 * put:
 * description: Utilisé pour modifier un serveur
 * responses:
 *
 *
 */

routerServeur.put("/", (req, res) => {
  res.send("Modification du serveur");
});

/**
 * @swagger
 * /serveur:
 * delete:
 * description: Utilisé pour supprimer un serveur
 * responses:
 *
 *
 */

routerServeur.delete("/", (req, res) => {
  res.send("Suppression de serveur");
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

routerServeur.post("/ban", (req, res) => {
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

routerServeur.delete("/ban", (req, res) => {
  res.send("Débannissement d'un utilisateur");
});

/**
 * @swagger
 * /serveur/salon:
 * get:
 * description: Utilisé pour récupérer l'interface d'un salon
 * responses:
 *
 *
 */

routerServeur.get("/salon", (req, res) => {
  res.send("Récupération de l'interface du salon");
});

/**
 * @swagger
 * /serveur/salon:
 * post:
 * description: Utilisé pour créer un salon
 * responses:
 *
 *
 */

routerServeur.post("/salon", (req, res) => {
  res.send("Création d'un salon");
});

/**
 * @swagger
 * /serveur/salon:
 * put:
 * description: Utilisé pour modifier un salon
 * responses:
 *
 *
 */

routerServeur.put("/salon", (req, res) => {
  res.send("Modification d'un salon");
});

/**
 * @swagger
 * /serveur/salon:
 * delete:
 * description: Utilisé pour supprimer un salon
 * responses:
 *
 *
 */

routerServeur.delete("/salon", (req, res) => {
  res.send("Suppression d'un salon");
});

/**
 * @swagger
 * /serveur/salon/invite:
 * post:
 * description: Utilisé pour créer un lien d'invitation
 * responses:
 *
 *
 */

routerServeur.post("/salon/invite", (req, res) => {
  res.send("Création d'un lien d'invitation");
});

/**
 * @swagger
 * /serveur/salon/invite:
 * get:
 * description: Utilisé pour récupérer tous les liens d'invitations
 * responses:
 *
 *
 */

routerServeur.get("/salon/invite", (req, res) => {
  res.send("Récupération de tous les liens d'invitations");
});

/**
 * @swagger
 * /serveur/salon/invite:
 * delete:
 * description: Utilisé pour supprimer un lien d'invitation
 * responses:
 *
 *
 */

routerServeur.delete("/salon/invite", (req, res) => {
  res.send("Suppression d'un lien d'invitation");
});

module.exports = routerServeur;
