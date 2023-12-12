const express = require("express");
const routerGroupe = express.Router();

const groupeModel = require("../../Model/Groupe.model");
const MembreGroupeModel = require("../../Model/Lien/MembreGroupe.model");

const functionGroupe = require("../../Logic/Groupe/Groupe");

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour récupérer l'interface du groupe
 * responses:
 * 
 */

routerGroupe.get("/", (req, res) => {
  if (!req.body.nom) {
    return res.status(400).json({
      message: "Veuillez ajouter un nom",
    });
  }
  functionGroupe.pagegroupe(req, res);
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
  if (!req.body.nom) {
    return res.status(400).json({
      message: "Veuillez ajouter un nom",
    });
  }
  functionGroupe.creergroupe(req, res);
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
  if (!req.body.nom) {
    return res.status(400).json({
      message: "Veuillez ajouter un nom",
    });
  }
  functionGroupe.modifgroupe(req, res);
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
  if (!req.body.nom) {
    return res.status(400).json({
      message: "Veuillez ajouter un nom",
    });
  }
  functionGroupe.suprimegroupe(req, res);
  res.send("Suppression de groupe");
});

/**
 * @swagger
 * /groupe:
 * post:
 * description: Utilisé pour ajouter un membre
 * responses:
 * 
 * 
 */

routerGroupe.post("/Member", (req, res) => {
  functionGroupe.addmembre(req, res);
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
  functionGroupe.deletemembre(req, res);
  res.send("exclusion de membre");
});

/**
 * @swagger
 * /groupe:
 * post:
 * description: Utilisé pour envoyer un message dans le groupe
 * responses:
 * 
 * 
 */

routerGroupe.post("/Message", (req, res) => {
  functionGroupe.envoimessage(req, res);
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

routerGroupe.delete("/Message", (req, res) => {
  functionGroupe.deletemessage(req, res);
  res.send("suppression de message");
});

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour recevoir un message
 * responses:
 * 
 * 
 */

routerGroupe.get("/Message", (req, res) => {
  functionGroupe.recevoirmessage(req, res);
  res.send("recoit les messages");
});


module.exports = routerGroupe;
