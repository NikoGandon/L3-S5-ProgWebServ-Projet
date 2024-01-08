const SalonModel = require("../../Model/Salon.model");
const ServeurModel = require("../../Model/Serveur.model");
/**
 * @description Récupère les salons d'un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function GetSalon(req, res) {
  try {
    const idServeur = req.query.idServeur;

    const existServeur = await ServeurModel.findOne({
      where: { id: idServeur },
    });

    if (!existServeur) {
      return res.status(404).json({ message: "Serveur non trouvé." });
    }

    let Salons = [];

    const salons = await SalonModel.findAll({
      attributes: ["id", "nom", "description", "idServeur"],
      where: {
        idServeur: existServeur.id,
      },
    });

    for (let i = 0; i < salons.length; i++) {
      Salons.push({
        id: salons[i].id,
        nom: salons[i].nom,
        description: salons[i].description,
      });
    }

    return res.status(200).json({
      salons: Salons,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération du serveur." + error,
    });
  }
}

module.exports = { GetSalon };
