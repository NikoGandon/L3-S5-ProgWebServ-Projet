const Serveur = require("../../Model/Serveur.model");
const UserModel = require("../../Model/User.model");
const MembreServeur = require("../../Model/MembreServeur.model");
const SalonModel = require("../../Model/Salon.model");
const { infoToken } = require("../../Middleware/AuthToken");

/**
 * @description Récupère un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function GetServeur(req, res) {
  try {
    const id = infoToken(req).id;
    const idServeur = req.body.idServeur;
    const serveur = await Serveur.findOne({
      where: { id: idServeur },
    });
    
    const membre = await MembreServeur.findOne({
      where: { idServeur: idServeur, idUser: id },
    });

    let Salons = [];
    let Membres = [];

    const salons = await SalonModel.findAll({
      where: { idServeur: idServeur },
    });

    const membres = await MembreServeur.findAll({
      where: { idServeur: idServeur },
    });

    for (let i = 0; i < salons.length; i++) {
      Salons.push({
        id: salons[i].id,
        nom: salons[i].nom,
        description: salons[i].description,
      });
    }

    for (let i = 0; i < membres.length; i++) {
      const user = await UserModel.findOne({
        where: { id: membres[i].idUser },
      });
      Membres.push({
        id: user.id,
        username: user.username,
        lienPP: user.lienPP,
      });
    }

    return res.status(200).json({
      serveur: {
        id: serveur.id,
        nom: serveur.nom,
        description: serveur.description,
        lienImage: serveur.lienImage,
        salons: Salons,
        membres: Membres,
      },
    });

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération du serveur." + error });
  }
}

module.exports = { GetServeur };
