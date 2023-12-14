const express = require("express");
const routerMessagePrive = express.Router();

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour voir la conversation privée
 * responses:
 * 
 */

routerGroupe.get("/", (req, res) => {
    res.send("Message Page");
  });

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour envoyer un message
 * responses:
 * 
 */

routerGroupe.post("/", (req, res) => {
    res.send("Envoi de message");
  });

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour supprimer un message
 * responses:
 * 
 */

routerGroupe.post("/", (req, res) => {
    res.send("Supprimer un message");
  });

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour recevoir un message
 * responses:
 * 
 */

routerGroupe.post("/", (req, res) => {
    res.send("Recevoir un message");
  });