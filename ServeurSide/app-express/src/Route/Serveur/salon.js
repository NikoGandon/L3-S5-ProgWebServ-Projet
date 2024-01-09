const express = require("express");
const salonRoute = express();

const { GetMessagesSalon } = require("../../logic/Serveur/GetMessagesSalon");
const { CreateSalon } = require("../../logic/Serveur/CreateSalon");
const { DeleteSalon } = require("../../logic/Serveur/DeleteSalon");
const { ModifySalon } = require("../../logic/Serveur/ModifySalon");


/**
 * @swagger
 * /serveur/salon:
 * get:
 * description: Utilisé pour récupérer l'interface d'un salon
 * responses:
 *
 *
 */

salonRoute.get("/", (req, res) => {
  if (!req.body.nom || !req.body.description || !req.body.idServeur) {
    res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  GetMessagesSalon(req, res);
});

/**
 * @swagger
 * /serveur/salon:
 * post:
 * description: Utilisé pour créer un salon
 * responses:
 *
 *
 */

salonRoute.post("/", (req, res) => {
  if (!req.body.nom || !req.body.description || !req.body.idServeur) {
    res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  CreateSalon(req, res);
});

/**
 * @swagger
 * /serveur/salon:
 * put:
 * description: Utilisé pour modifier un salon
 * responses:
 *
 *
 */

salonRoute.put("/", (req, res) => {
  if (!req.body.idSalon || (!req.body.nom && !req.body.description)) {
    res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  ModifySalon(req, res);
});

/**
 * @swagger
 * /serveur/salon:
 * delete:
 * description: Utilisé pour supprimer un salon
 * responses:
 *
 *
 */

salonRoute.delete("/", (req, res) => {
  if (!req.body.idSalon) {
    res.status(400).json({
      message: "Veuillez remplir tous les champs",
    });
  }
  DeleteSalon(req, res);
});

module.exports = salonRoute;
