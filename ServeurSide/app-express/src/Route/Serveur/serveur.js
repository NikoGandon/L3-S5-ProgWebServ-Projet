const express = require("express");
const routerServeur = express.Router(); // Créez un nouvel objet routeur

const banRoute = require("./ban");
const salonRoute = require("./salon");
const inviteRoute = require("./invite");

const { CreateServeur } = require("../../logic/Serveur/CreateServeur");
const { GetServeur } = require("../../logic/Serveur/GetServeur");
const { DeleteServeur } = require("../../logic/Serveur/DeleteServeur");
const { BanMembre } = require("../../logic/Serveur/BanMembre");
const { UnbanMembre } = require("../../logic/Serveur/UnbanMembre");
const { InviteMembre } = require("../../Logic/Serveur/AddMembre");
const { DeleteMembre } = require("../../logic/Serveur/DeleteMembre");

const UserModel = require("../../Model/User.model");
const ServeurModel = require("../../Model/Serveur.model");
const MembreServeur = require("../../Model/MembreServeur.model");

const { infoToken } = require("../../Middleware/AuthToken");

/**
 * @desc Vérifie si l'utilisateur a les droits d'administrateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const checkAdminServ = async (req, res, next) => {
  const id = infoToken(req).id;

  const user = await UserModel.findOne({ id: id });
  if (!user) {
    return res.status(202).json({ message: "Utilisateur non trouvé." });
  }

  const serveur = await ServeurModel.findOne({ id: req.body.idServeur });
  if (!serveur) {
    return res.status(202).json({ message: "Serveur non trouvé." });
  }
  // TODO: a terminer
  next();
};

const checkMembreServ = async (req, res, next) => {
  const id = infoToken(req).id;

  const user = await UserModel.findOne({ id: id });

  if (!user) {
    return res.status(202).json({ message: "Utilisateur non trouvé." });
  }

  const serveur = await ServeurModel.findOne({ id: req.body.idServeur });
  if (!serveur) {
    return res.status(202).json({ message: "Serveur non trouvé." });
  }

  const membre = await MembreServeur.findOne({
    idUser: id,
    idServeur: req.body.idServeur,
  });

  if (!membre) {
    return res
      .status(202)
      .json({ message: "Vous n'êtes pas membre du serveur." });
  }

  next();
};

/**
 * @swagger
 * /serveur:
 * get:
 * description: Utilisé pour récupérer l'interface du serveur
 * responses:
 *
 */

routerServeur.get("/", checkMembreServ, (req, res) => {
  if (!req.body.idServeur) {
    return res.status(400).json({
      message: "Erreur lors de la requête.",
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

routerServeur.put("/", checkAdminServ, (req, res) => {
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
