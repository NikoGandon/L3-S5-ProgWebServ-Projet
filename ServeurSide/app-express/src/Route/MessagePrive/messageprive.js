const express = require("express");
const routerMessagePrive = express.Router();

const { verifyToken } = require("../../Middleware/AuthToken");

const { getConversation } = require("../../Logic/MessagePrive/messagePrive");

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour voir la conversation privée
 * responses:
 *
 */

routerMessagePrive.get("/", (req, res) => {
  getConversation(req, res);
});

/**
 * @swagger
 * /groupe:
 * get:
 * description: Utilisé pour envoyer un message
 * responses:
 *
 */

routerMessagePrive.post("/", (req, res) => {
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

routerMessagePrive.post("/", (req, res) => {
  res.send("Supprimer un message");
});

module.exports = routerMessagePrive;
