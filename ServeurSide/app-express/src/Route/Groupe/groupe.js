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
  const idGroupe = req.query.idGroupe;

  if (idGroupe == undefined || idGroupe == null) {
    return res.status(400).json({
      message: "Erreur lors de la requête: ajoutez un idGroupe",
    });
  }
  functionGroupe.pagegroupe(req, res);
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
  if (!req.body.idGroupe) {
    return res.status(400).json({
      message: "Veuillez ajouter un id",
    });
  }
  if (!req.body.nom) {
    return res.status(400).json({
      message: "Veuillez ajouter un nom",
    });
  }
  functionGroupe.modifgroupe(req, res);
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
  if (!req.body.idGroupe) {
    return res.status(400).json({
      message: "Veuillez ajouter un id",
    });
  }
  functionGroupe.suprimegroupe(req, res);
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
  if (!req.body.idGroupe) {
    return res.status(400).json({
      message: "Veuillez ajouter un idGroupe",
    });
  }
  if (!req.body.idUser) {
    return res.status(400).json({
      message: "Veuillez ajouter un idUser",
    });
  }
  functionGroupe.addmembre(req, res);
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
  if (!req.body.idGroupe) {
    return res.status(400).json({
      message: "Veuillez ajouter un idGroupe",
    });
  }
  if (!req.body.idUser) {
    return res.status(400).json({
      message: "Veuillez ajouter un idUser",
    });
  }
  functionGroupe.deletemembre(req, res);
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
  if (!req.body.idMessage) {
    return res.status(400).json({
      message: "Veuillez ajouter un idMessage",
    });
  }
  functionGroupe.deletemessage(req, res);
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
  if (!req.body.idGroupe) {
    return res.status(400).json({
      message: "Veuillez ajouter un idGroupe",
    });
  }
  functionGroupe.recevoirmessage(req, res);
});


module.exports = routerGroupe;
