const SalonModel = require("../../Model/Salon.model");

/**
 * @description Récupère les salons d'un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function GetSalon(req, res) {
  try {
    const idServeur = req.body.idServeur;

    let Salons = [];

    const salons = await SalonModel.findAll({
      where: { idServeur: idServeur },
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
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération du serveur." + error });
  }
}

module.exports = { GetSalon };
