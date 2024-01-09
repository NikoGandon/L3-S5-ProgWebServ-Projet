const UserModel = require("../../Model/User.model");
const MessagePriveModel = require("../../Model/Message/MessagePrive.model");
const Message = require("../../Model/Message/Message.model");
const { Op } = require("sequelize");

const { infoToken } = require("../../Middleware/AuthToken");

/**
 * @desc Utilisé pour voir la conversation privée, récuperer les messages par ordre décroissant
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getConversation(req, res) {
  const id = infoToken(req).id;

  try {
    const user = await UserModel.findById(id);

    if (!user) return res.status(200).json("Utilisateur introuvable.");

    const messages = await MPModel.findAll({
      where: {
        [Op.or]: [{ idAuteur: user.id }, { idDestinataire: user.id }],
      },
      include: [
        {
          model: MessageModel,
          attributes: ["id", "date", "contenu"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!messages) return res.status(200).json("Pas de message.");

    const formattedMessages = messages.map((mp) => ({
      idMessagePrv: mp.idMessagePrv,
      idAuteur: mp.idAuteur,
      idDestinataire: mp.idDestinataire,
      message: {
        id: mp.Message.id,
        date: mp.Message.date,
        contenu: mp.Message.contenu,
      },
      isOwnMessage: mp.idAuteur === id,
    }));

    res.status(200).json({ messages: formattedMessages });
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getConversation,
};
