const express = require("express");
const routerAuth = express();

const login = require("./login");
const register = require("./register");
const OAuth = require("./OAuth2/Google.OAuth2");
const logout = require("./logout");
const checkAuth = require("./check-auth");

/**
 * @swagger
 * /Auth:
 * get:
 * description: Envoie de la page d'accueil de l'authentification
 */
routerAuth.get("/", (req, res) => res.status(200).json({ message: "Route non terminée." }));

routerAuth.use("/check-auth", checkAuth);
routerAuth.use("/login", login);
routerAuth.use("/logout", logout);
routerAuth.use("/OAuth", OAuth);
routerAuth.use("/register", register);

module.exports = routerAuth;