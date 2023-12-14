const express = require("express");
const routeurUser = express();

const login = require("./Authentification/login");
const register = require("./Authentification/register");
const OAuth = require("./Authentification/OAuth2/Google.OAuth2");

const AmiRoute = require("./Ami/friendUser");
const BlocklistRoute = require("./Blocklist/blockListUser");
const { verifyToken } = require("../../Middleware/AuthToken");

routeurUser.use("/login", login);
routeurUser.use("/register", register);
// ? - - routerUser.get('/OAuth/Google', OAuth);

/**
 * @swagger
 * /User:
 * get:
 * description:
 * responses:
 *
 */
routeurUser.get("/", verifyToken, () => {});

/**
 * @swagger
 * /User:
 * put:
 * description: Modifie le compte de l'utilisateur
 * responses:
 *
 */

routeurUser.put("/", verifyToken, () => {});

/**
 * @swagger
 * /User:
 * delete:
 * description: Supprime l'utilisateur
 * responses:
 *
 */

routeurUser.delete("/", verifyToken, () => {});

/**
 * @swagger
 * /User/Param:
 * put:
 * description: Modifie les paramètres de l'utilisateur
 * responses:
 *
 */

routeurUser.put("/param", verifyToken, () => {});

routeurUser.use("/friend", verifyToken, AmiRoute);

routeurUser.use("/blocklist", verifyToken, BlocklistRoute);

routeurUser.get("/search", verifyToken, () => {});

module.exports = routeurUser;
