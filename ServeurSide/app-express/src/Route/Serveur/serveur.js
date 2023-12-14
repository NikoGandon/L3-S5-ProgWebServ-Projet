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

module.exports = routerServeur;


