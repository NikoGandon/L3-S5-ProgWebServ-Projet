const SalonModel = require("../../Model/Salon.model");
const MessageSalonModel = require("../../Model/Message/MessageSalon.model");
const UserModel = require("../../Model/User.model");

/**
 * @desc Récupère les messages d'un salon dans l'ordre décroissant
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function GetMessagesSalon(req, res) {
  try {
    const idSalon = req.body.idSalon;

    let salon = await SalonModel.findByPk(idSalon);
    if (!salon) {
      return res.status(400).json({
        message: "Le salon n'existe pas.",
      });
    }

    let Messages = [];
    const messages = await MessageSalonModel.findAll(
      {
        where: { idSalon: idSalon },
      },
      {
        include: [
          {
            model: UserModel,
            as: "auteur",
            attributes: ["id", "username", "email", "lienPP"],
          },
        ],
      },
      { order: [["date", "DESC"]] }
    );

    for (let i = 0; i < messages.length; i++) {
      Messages.push({
        id: messages[i].id,
        contenu: messages[i].contenu,
        date: messages[i].date,
        auteur: messages[i].auteur,
      });
    }

    return res.status(200).json({
      messagesSalon: Messages,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération du serveur." + error });
  }
}

module.exports = { GetMessagesSalon };
