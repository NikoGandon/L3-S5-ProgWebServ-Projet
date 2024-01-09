const express = require("express");
const routeurUser = express();

const AmiRoute = require("./Ami/friendUser");
const BlocklistRoute = require("./Blocklist/blockListUser");
const { verifyToken } = require("../../Middleware/AuthToken");

const userLogic = require("../../Logic/Utilisateur/user");
const getDM = require("../../Logic/Utilisateur/get-DM");
const getServeurs = require("../../Logic/Utilisateur/get-serveurs");

/**
 * @swagger
 * /User/AccueilUser:
 * get:
 * description: Envoie les données pour la page d'accueil de l'utilisateur
 * responses:
 *
 *
 */
routeurUser.get("/AccueilUser", verifyToken, (req, res) => {
  return res.status(200).json({ message: "Route non terminée." });
});

/**
 * @swagger
 * /User:
 * get:
 * description: Récupère les informations de l'utilisateur
 * responses:
 *
 */
routeurUser.get("/", (req, res) => {
  userLogic.getInformation(req, res);
});

/**
 * @swagger
 * /User:
 * put:
 * description: Modifie le compte de l'utilisateur
 * responses:
 *
 */

routeurUser.put("/", (req, res) => {
  userLogic.updateInformation(req, res);
});

/**
 * @swagger
 * /User:
 * delete:
 * description: Supprime l'utilisateur
 * responses:
 *
 */

routeurUser.delete("/", (req, res) => {
  userLogic.deleteUser(req, res);
});

/**
 * @swagger
 * /User/Param:
 * put:
 * description: Modifie les paramètres de l'utilisateur
 * responses:
 *
 */

routeurUser.put("/param", () => {
  return res.status(200).json({ message: "Route non terminée." });
});

routeurUser.use("/friend", AmiRoute);

routeurUser.use("/blocklist", BlocklistRoute);

routeurUser.get("/search", () => {
  return res.status(200).json({ message: "Route non terminée." });
});

/**
 * @swagger
 * /User/get-serveurs:
 * get:
 * description: Récupère les serveurs de l'utilisateur
 */
routeurUser.get("/get-serveurs", (req, res) => {
  getServeurs(req, res);
});

/**
 * @swagger
 * /User/get-DM:
 * get:
 * description: Récupère les DM et groupes de l'utilisateur
 */

routeurUser.get("/get-DM", (req, res) => {
  getDM(req, res);
});

module.exports = routeurUser;
