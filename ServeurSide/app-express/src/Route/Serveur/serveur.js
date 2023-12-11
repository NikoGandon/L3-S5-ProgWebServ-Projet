const express = require("express");
const routerServeur = express.Router(); // Créez un nouvel objet routeur

const banRoute = require("./ban");
const salonRoute = require("./salon");
const inviteRoute = require("./invite");

const {CreateServeur} = require("../../logic/Serveur/CreateServeur");

/**
 * @swagger
 * /serveur:
 * get:
 * description: Utilisé pour récupérer l'interface du serveur
 * responses:
 *
 */

routerServeur.get("/", (req, res) => {
  res.send("Interface du serveur");
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
    if (!req.body.nom || !req.body.description || !req.body.lienImage) {
      res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  CreateServeur(req, res);
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
 * /serveur:
 * delete:
 * description: Utilisé pour supprimer un serveur
 * responses:
 *
 *
 */

// Utilisation des routes externes
routerServeur.use("/ban", banRoute);
routerServeur.use("/salon", salonRoute);
routerServeur.use("/invite", inviteRoute);

module.exports = routerServeur; // Exportez votre routeur correctement