const express = require("express");
const salonRoute = express();

/**
 * @swagger
 * /serveur/salon:
 * get:
 * description: Utilisé pour récupérer l'interface d'un salon
 * responses:
 *
 *
 */

salonRoute.get("/", (req, res) => {
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

salonRoute.post("/", (req, res) => {
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

salonRoute.put("/", (req, res) => {
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

salonRoute.delete("/", (req, res) => {
  res.send("Suppression d'un salon");
});

module.exports = salonRoute;
