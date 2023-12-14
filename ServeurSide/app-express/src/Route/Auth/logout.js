const express = require("express");
const logoutRouteur = express.Router();

/**
 * @swagger
 * /User/logout:
 * post:
 * description: Déconnecte l'utilisateur
 * responses:
 * 
 */

logoutRouteur.get("/", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
        });
});

module.exports = logoutRouteur;