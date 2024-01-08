const BanniServeur = require("../../Model/BanniServeur.model");

const { infoToken } = require("../../Middleware/AuthToken");

/**
 * @description Ban un membre du serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function BanMembre(req, res) {
  try {
    const idUser = infoToken(req).id;
    const idServeur = req.body.idServeur;
    const date = req.body.date;
    const raison = req.body.raison;

    const NewBanniServeur = await BanniServeur.create({
      idUser: idUser,
      idServeur: idServeur,
      date: date,
      raison: raison,
    });

    return res.status(201).json({message: "Membre banni."});
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors du bannissement du membre." });
  }
}

module.exports = { BanMembre };
