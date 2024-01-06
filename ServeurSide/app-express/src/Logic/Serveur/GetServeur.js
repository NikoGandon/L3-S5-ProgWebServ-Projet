const Serveur = require("../../Model/Serveur.model");
const UserModel = require("../../Model/User.model");
const MembreServeur = require("../../Model/MembreServeur.model");
const SalonModel = require("../../Model/Salon.model");
const { infoToken } = require("../../Middleware/AuthToken");
const MessageSalonModel = require("../../Model/Message/MessageSalon.model");
const MessageModel = require("../../Model/Message/Message.model");

async function getInfoSalon(req, res, idServeur, idSalon) {
  const serveur = await Serveur.findOne({ where: { id: idServeur } });

  if (!serveur) {
    return res.status(202).json({ message: "Serveur non trouvé." });
  }

  const salon = await SalonModel.findOne({
    attributes: ["id", "nom", "description", "idServeur"],
    where: {
      id: idSalon,
      idServeur: idServeur,
    },
  });

  if (!salon) {
    return res.status(202).json({ message: "Salon non trouvé." });
  }

  const MessageSalon = await MessageSalonModel.findAll({
    where: { idSalon: salon.id },
  });

  let Messages = [];

  for (const messageSalon of MessageSalon) {
    const messageMod = await MessageModel.findOne({
      where: { id: messageSalon.idMessage },
    });

    const user = await UserModel.findOne({
      where: { id: messageMod.userId },
    });

    if (user) {
      console.log(messageMod);
      Messages.push({
        id: messageMod.id,
        contenu: messageMod.contenu,
        date: messageMod.createdAt,
        username: user.username,
      });
    } else console.log("User non trouvé.");
    console.log(Messages);
  }

  return res.status(200).json({ messages: Messages, nomSalon: salon.nom });
}

/**
 * @description Récupère un serveur
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function GetServeur(req, res) {
  try {
    const id = infoToken(req).id;
    const idServeur = req.query.idServeur;
    const idSalon = req.query.idSalon;

    console.log("id : " + id);
    console.log("idServeur : " + idServeur);
    console.log("idSalon : " + idSalon);

    const serveur = await Serveur.findOne({
      where: { id: idServeur },
    });

    if (!serveur) {
      console.log("Serveur non trouvé.");
      return res.status(404).json({ message: "Serveur non trouvé." });
    }

    if (idSalon != undefined || idSalon != null) {
      return getInfoSalon(req, res, serveur.id, idSalon);
    }

    const membre = await MembreServeur.findOne({
      where: { idServeur: serveur.id, idUser: id },
    });

    let Salons = [];
    let Membres = [];

    /* Ne marche pas pour je ne sais quelle raison, vive sequelize......
    const salons = await SalonModel.findAll({
      where: { idServeur: 10 },
    });*/

    const salons = await SalonModel.findAll({
      attributes: ["id", "nom", "description", "idServeur"],
      where: {
        idServeur: serveur.id,
      },
    });

    const membres = await MembreServeur.findAll({
      where: { idServeur: serveur.id },
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
    return res.status(500).json({
      error:
        "Erreur lors de la récupération du serveur from GetServeur." + error,
    });
  }
}

module.exports = { GetServeur };
