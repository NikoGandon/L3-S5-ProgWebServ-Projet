const ServeurModel = require("../../Serveur.model");
const CodeServeur = require("../../Model/Lien/CodeServeur.model");

/**
 * @description Crée un code pour rejoindre un serveur
 *
 */

async function CreateCodeServeur(req, res) {
  try {
    const idServeur = req.body.idServeur;

    const code = Math.random().toString(36).substr(2, 8);

    const serveur = await ServeurModel.findOne({
      where: { id: idServeur },
    });

    if (!serveur) {
      return res.status(404).json({ error: "Serveur non trouvé." });
    }

    const codeServeur = await CodeServeur.create({
      idServeur: idServeur,
      code: code,
    });

    return res.status(201).json(codeServeur);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la création du code." });
  }
}

module.exports = { CreateCodeServeur };