const express = require("express");
const routeurUser = express();

const login = require("./Authentification/login");
const register = require("./Authentification/register");
const OAuth = require("./Authentification/OAuth2/Google.OAuth2");

const AmiRoute = require("./Ami/friendUser");
const BlocklistRoute = require("./Blocklist/blockListUser");

routeurUser.post("/login", login);
routeurUser.post("/register", register);
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

/**
 * @swagger
 * /User/friend:
 * post:
 * description: Ajoute un ami
 * responses:
 *
 */

routeurUser.post("/friend", AmiRoute);

/**
 * @swagger
 * /User/friend:
 * get:
 * description: Récupère la liste des amis
 * responses:
 *
 */

routeurUser.get("/friend", AmiRoute);

/**
 * @swagger
 * /User/friend:
 * delete:
 * description: Supprime un ami
 * responses:
 *
 */

routeurUser.delete("/friend", AmiRoute);

/**
 * @swagger
 * /User/blocklist:
 * post:
 * description: Ajoute un utilisateur à sa blocklist
 * responses:
 *
 */

routeurUser.post("/blocklist", () => {});

/**
 * @swagger
 * /User/blocklist:
 * get:
 * description: Récupère la blocklist
 * responses:
 *
 */

routeurUser.get("/blocklist", () => {});

/**
 * @swagger
 * /User/search:
 * get:
 * description: Recherche un utilisateur
 * responses:
 *
 */

routeurUser.get("/search", () => {});

module.exports = routeurUser;
