const BanniServeur = require("../../Model/BanniServeur.model");

async function UnbanMembre(req, res) {
  try {
    const idUser = req.body.idUser;

    await BanniServeur.destroy({
      where: { idUser: idUser },
    });

    return res.status(201).json({ message: "Membre débanni." });
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." + error });
  }
}

module.exports = { UnbanMembre };
