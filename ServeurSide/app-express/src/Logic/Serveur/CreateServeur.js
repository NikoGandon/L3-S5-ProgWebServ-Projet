const Serveur = require("../../Model/Serveur.model");
const { infoToken } = require("../../Middleware/AuthToken");

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

    await Serveur.create({
      nom: nom,
      description: description,
      lienImage: lienImage,
      idCreateur: idUser,
    });

    return res.status(201).json({ message: "Serveur créé." });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la création du serveur." });
  }
}

module.exports = { CreateServeur };
