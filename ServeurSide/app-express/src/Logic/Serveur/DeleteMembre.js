const MembreServeur = require("../../Model/MembreServeur.model");
const { infoToken } = require("../../Middleware/AuthToken");


/**
 * @description Supprime un membre du serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function DeleteMembre(req, res) {
  try {
    const idUser = infoToken(req).id;
    const idServeur = req.body.idServeur;

    const delMembre = await MembreServeur.findOne({
      where: { idServeur: idServeur, idUser: idUser },
    });

    if (!delMembre) {
      return res.status(404).json({ error: "Membre ou serveur non trouvé." });
    }

    delMembre.destroy();
    return res.status(201).json({ message: "Divorce du membre et du serveur :(" });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la fin de l'inscription du membre : " + error });
  }
}

module.exports = { DeleteMembre };
