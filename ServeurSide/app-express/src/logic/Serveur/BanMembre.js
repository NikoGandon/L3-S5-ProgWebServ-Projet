const BanniServeur = require("../../Model/BanniServeur.model");

async function BanMembre(req, res) {
  try {
    const idUser = req.body.idUser;
    const idServeur = req.body.idServeur;
    const date = req.body.date;
    const raison = req.body.raison;

    const NewBanniServeur = await BanniServeur.create({
      idUser: idUser,
      idServeur: idServeur,
      date: date,
      raison: raison
    });

    return res.status(201).json(NewBanniServeur);

  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." + error});
  }
    
}

module.exports = {BanMembre};