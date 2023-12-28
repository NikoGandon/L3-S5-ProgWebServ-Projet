const Serveur = require("../../Model/Serveur.model");
const { infoToken } = require("../../Middleware/AuthToken");

/**
 * @description Supprime un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function DeleteServeur(req, res) {
  try {
    const id = infoToken(req).id;
    const idServeur = req.body.idServeur;
    const serveur = await Serveur.findOne({
      where: { id: idServeur },
    });

    if (!serveur) {
      return res.status(404).json({ error: "Serveur non trouvé." });
    }

    serveur.destroy();
    return res.status(200).json({
      message: "Serveur supprimé.",
    });
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." });
  }
}

module.exports = { DeleteServeur };
