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

/**
 * @swagger
 * /groupe:
 * delete:
 * description: Utilisé pour ajouter un membre
 * responses:
 * 
 * 
 */

routerGroupe.post("/Member", (req, res) => {
  res.send("Ajout de membre");
});

/**
 * @swagger
 * /groupe:
 * delete:
 * description: Utilisé pour exclure un membre
 * responses:
 * 
 * 
 */

routerGroupe.delete("/Member", (req, res) => {
  res.send("exclusion de membre");
});

/**
 * @swagger
 * /groupe:
 * delete:
 * description: Utilisé pour envoyer un message dans le groupe
 * responses:
 * 
 * 
 */

routerGroupe.post("/", (req, res) => {
  res.send("envoi de message");
});

/**
 * @swagger
 * /groupe:
 * delete:
 * description: Utilisé pour supprimer un message
 * responses:
 * 
 * 
 */

routerGroupe.delete("/", (req, res) => {
  res.send("suppression de message");
});

/**
 * @swagger
 * /groupe:
 * delete:
 * description: Utilisé pour recevoir un message
 * responses:
 * 
 * 
 */

routerGroupe.get("/", (req, res) => {
  res.send("recoit les messages");
});


module.exports = routerGroupe;
