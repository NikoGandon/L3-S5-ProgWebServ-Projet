const express = require("express");
const routerServeur = express.Router(); // Créez un nouvel objet routeur

const banRoute = require("./ban");
const salonRoute = require("./salon");
const inviteRoute = require("./invite");

const {CreateServeur} = require("../../logic/Serveur/CreateServeur");
const {GetServeur} = require("../../logic/Serveur/GetServeur");
const {DeleteServeur} = require("../../logic/Serveur/DeleteServeur");
const { BanMembre } = require("../../logic/Serveur/BanMembre");
const { UnbanMembre } = require("../../logic/Serveur/UnbanMembre");
const { CreateSalon } = require("../../logic/Serveur/CreateSalon");
const { DeleteSalon } = require("../../logic/Serveur/DeleteSalon");
const { InviteMembre } = require("../../logic/Serveur/InviteMembre");

/**
 * @swagger
 * /serveur:
 * get:
 * description: Utilisé pour récupérer l'interface du serveur
 * responses:
 *
 */

routerServeur.get("/", (req, res) => {
  if (!req.body.idServeur) {
      return res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  GetServeur(req, res);
});

/**
 * @swagger
 * /serveur:
 * post:
 * description: Utilisé pour créer un serveur
 * responses:
 *
 *
 */

routerServeur.post("/", (req, res) => {
    if (!req.body.nom || !req.body.description || !req.body.lienImage) {
      res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  CreateServeur(req, res);
});

/**
 * @swagger
 * /serveur:
 * put:
 * description: Utilisé pour modifier un serveur
 * responses:
 *
 *
 */

routerServeur.put("/", (req, res) => {
  res.send("Modification du serveur");
});

/**
 * @swagger
 * /serveur:
 * delete:
 * description: Utilisé pour supprimer un serveur
 * responses:
 *
 *
 */

routerServeur.delete("/", (req, res) => {
  if (!req.body.idServeur) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  DeleteServeur(req, res);
});

/**
 * @swagger
 * /serveur:
 * delete:
 * description: Utilisé pour supprimer un serveur
 * responses:
 *
 *
 */
routerServeur.post("/invite", (req, res) => {
  if (!req.body.idUser || !req.body.idServeur) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  InviteMembre(req, res);
});

routerServeur.delete("/salon", (req, res) => {
  if (!req.body.idSalon) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  DeleteSalon(req, res);
});

routerServeur.post("/salon", (req, res) => {
  if (!req.body.nom || !req.body.description || !req.body.idServeur) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  CreateSalon(req, res);
});

routerServeur.post("/ban", (req, res) => {
  if (!req.body.idUser || !req.body.idServeur || !req.body.date) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  BanMembre(req, res);
});

routerServeur.delete("/ban", (req, res) => {
  if (!req.body.idUser) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  UnbanMembre(req, res);
});

routerServeur.use("/invite", inviteRoute);

module.exports = routerServeur;