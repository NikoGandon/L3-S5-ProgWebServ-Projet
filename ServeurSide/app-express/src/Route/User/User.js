const express = require("express");
const routeurUser = express();

const AmiRoute = require("./Ami/friendUser");
const BlocklistRoute = require("./Blocklist/blockListUser");
const { verifyToken } = require("../../Middleware/AuthToken");

const userLogic = require("../../logic/Utilisateur/user");
routeurUser.post("/login", login);
routeurUser.post("/register", register);
// ? - - routeurUser.get('/OAuth/Google', OAuth);

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


module.exports = routeurUser;
