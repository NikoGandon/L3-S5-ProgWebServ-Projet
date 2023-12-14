const express = require("express");
const routeurUser = express();

const login = require("./Authentification/login");
const register = require("./Authentification/register");
const OAuth = require("./Authentification/OAuth2/Google.OAuth2");

const AmiRoute = require("./Ami/friendUser");
const BlocklistRoute = require("./Blocklist/blockListUser");

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
routeurUser.get("/", () => {});

/**
 * @swagger
 * /User:
 * put:
 * description: Modifie le compte de l'utilisateur
 * responses:
 *
 */

routeurUser.put("/", () => {});

/**
 * @swagger
 * /User:
 * delete:
 * description: Supprime l'utilisateur
 * responses:
 *
 */

routeurUser.delete("/", () => {});

/**
 * @swagger
 * /User/Param:
 * put:
 * description: Modifie les paramètres de l'utilisateur
 * responses:
 *
 */

routeurUser.put("/param", () => {});

routeurUser.use("/friend", AmiRoute);

routeurUser.use("/blocklist", BlocklistRoute);

routeurUser.get("/search", () => {});

module.exports = routeurUser;
