const express = require("express");
const routerGroupe = express.Router();

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour récupérer l'interface du groupe
 * responses:
 * 
 */

routerGroupe.get("/", (req, res) => {
  res.send("Groupe page");
});

/**
 * @swagger
 * /groupe:
 * post:
 * description: Utilisé pour créer un groupe
 * responses:
 * 
 * 
 */

routerGroupe.post("/", (req, res) => {
  res.send("Création du groupe");
});


/**
 * @swagger
 * /groupe:
 * put:
 * description: Utilisé pour modifier un groupe
 * responses:
 * 
 * 
 */
routerGroupe.put("/", (req, res) => {
  res.send("Modification du groupe");
});

/**
 * @swagger
 * /groupe:
 * delete:
 * description: Utilisé pour supprimer un groupe
 * responses:
 * 
 * 
 */

routerGroupe.delete("/", (req, res) => {
  res.send("Suppression de groupe");
});

module.exports = routerGroupe;
