const Serveur = require("../../Model/Serveur.model");

/**
 * @description Crée un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function CreateServeur(req, res) {
  try {
    const nom = req.body.nom;
    const description = req.body.description;
    const lienImage = req.body.lienImage;

    const newServeur = await Serveur.create({
      nom: nom,
      description: description,
      lienImage: lienImage,
    });

    return res.status(201).json(newServeur);
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." });
  }
}

module.exports = { CreateServeur };
