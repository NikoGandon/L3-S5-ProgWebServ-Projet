const SalonModel = require("../../Model/Salon.model");

/**
 * @description Crée un salon
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function CreateSalon(req, res) {
  try {
    const nom = req.body.nom;
    const description = req.body.description;
    const idServeur = req.body.idServeur;

    const NewSalon = await SalonModel.create({
      nom: nom,
      description: description,
      idServeur: idServeur,
    });

    return res.status(201).json({ message: "Salon créé." });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la création du salon."});
  }
}

module.exports = { CreateSalon };
