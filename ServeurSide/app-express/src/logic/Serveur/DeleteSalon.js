const Salon = require("../../Model/Salon.model");

/**
 * @description Supprime un salon
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function DeleteSalon(req, res) {
  try {
    const idSalonn = req.body.idSalon;
    const salon = await Salon.findOne({
      where: { id: idSalonn },
    });

    if (!salon) {
      return res.status(404).json({ error: "Salon non trouvé." });
    }

    salon.destroy();
    return res.status(200).json({
      message: "Serveur supprimé.",
    });
  } catch (error) {
    return res.status(500).json({ error: "Ca marche pas." });
  }
}

module.exports = { DeleteSalon };
