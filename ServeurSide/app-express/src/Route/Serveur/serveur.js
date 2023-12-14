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
const { DeleteMembre } = require("../../logic/Serveur/DeleteMembre");
const { ModifySalon } = require("../../logic/Serveur/ModifySalon");

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

<<<<<<< e069523a71842b8596089ff2bc22124206ace957
/**
 * @swagger
 * /serveur:
 * delete:
 * description: Utilisé pour supprimer un serveur
 * responses:
 *
 *
 */
routerServeur.post("/membre", (req, res) => {
  if (!req.body.idUser || !req.body.idServeur) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  InviteMembre(req, res);
});

routerServeur.delete("/membre", (req, res) => {
  if (!req.body.idUser || !req.body.idServeur) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  DeleteMembre(req, res);
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

routerServeur.put("/salon", (req, res) => {
  if (!req.body.idSalon || !req.body.nom && !req.body.description) {
    res.status(400).json({
    message: "Veuillez remplir tous les champs",
  });
  }
  ModifySalon(req, res);
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
=======
module.exports = routerServeur;


>>>>>>> 1c8e9910666a9bfd5086f1f2f1017d5cf021cc74