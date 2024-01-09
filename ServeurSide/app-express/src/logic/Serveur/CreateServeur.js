const Serveur = require("../../Model/Serveur.model");
const { infoToken } = require("../../Middleware/AuthToken");
const Salon = require("../../Model/Salon.model");
const SalonServeur = require("../../Model/Lien/SalonServeur.model");

/**
 * @description Crée un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function CreateServeur(req, res) {
  try {
    const idUser = infoToken(req).id;
    const nom = req.body.nom;
    const description = req.body.description;
    const lienImage = req.body.lienImage;

    const serveur = await Serveur.create({
      nom: nom,
      description: description,
      lienImage: lienImage,
      idCreateur: idUser,
    });

    const salon = await Salon.create({
      nom: "Général",
      idServeur: serveur.id,
    });

    await SalonServeur.create({
      salonId: salon.id,
      serveurId: serveur.id,
    });

    return res.status(200).json({ message: "Serveur créé." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la création du serveur." });
  }
}

module.exports = { CreateServeur };
