const BanniServeur = require("../../Model/BanniServeur.model");

async function BanMembre(req, res) {
  try {
    const idServeur = req.body.idServeur;
    const idMembre = req.body.idMembre;
    const raison = req.body.raison;
    const date = req.body.date;

    const newBanniServeur = await BanniServeur.create({
      idServeur: idServeur,
      idMembre: idMembre,
      raison: raison,
      date: date
    });

    return res.status(201).json(newBanniServeur);
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." });
  }
    
}

module.exports = {BanMembre};