const MembreServeur = require("../../Model/MembreServeur.model");

/**
 * @description Supprime un membre du serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function DeleteMembre(req, res) {
  try {
    const idUser = req.body.idUser;
    const idServeur = req.body.idServeur;

    const delMembre = await MembreServeur.findOne({
      where: { idServeur: idServeur, idUser: idUser },
    });

    if (!delMembre) {
      return res.status(404).json({ error: "Membre ou serveur non trouvé." });
    }

    delMembre.destroy();
    return res.status(201).json({ message: "Membre supprimé." });
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." + error });
  }
}

module.exports = { DeleteMembre };
