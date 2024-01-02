const UserModel = require("../../Model/User.model");
const GroupeModel = require("../../Model/Groupe.model");
const MembreGroupeModel = require("../../Model/Lien/MembreGroupe.model");
const MessageGroupeModel = require("../../Model/Message/MessageGroupe.model");
const MessagePriveModel = require("../../Model/Message/MessagePrive.model");
const MessageModel = require("../../Model/Message/Message.model");

const { infoToken } = require("../../Middleware/AuthToken");

const getGroupes = async (req, res) => {
  const id = infoToken(req).id;
  console.log("id user : " + id);

  try {
    const utilisateur = await UserModel.findByPk(id, {
      include: [
        {
          model: GroupeModel,
          as: "groupes",
          through: {
            attributes: [],
          },
          include: [
            {
              model: MembreGroupeModel,
              as: "membres",
              through: {
                attributes: [],
              },
              include: [
                {
                  model: UserModel,
                  as: "utilisateur",
                  attributes: ["id", "username", "email", "lienPP"],
                },
              ],
            },
            {
              model: MessageGroupeModel,
              as: "messages",
              through: {
                attributes: [],
              },
              include: [
                {
                  model: MessageModel,
                  as: "message",
                  attributes: ["id", "contenu", "createdAt"],
                },
              ],
              order: [[MessageModel, "createdAt", "DESC"]],
              limit: 1,
            },
          ],
          order: [[MessageGroupeModel, "createdAt", "DESC"]],
        },
        {
          model: MessagePriveModel,
          as: "messagesPrives",
          through: {
            attributes: [],
          },
          include: [
            {
              model: MessageModel,
              as: "message",
              attributes: ["id", "contenu", "createdAt"],
            },
          ],
          order: [[MessageModel, "date", "DESC"]],
          limit: 1,
        },
      ],
    });

    return res.status(200).json({
      groupes: utilisateur.groupes,
      messagesPrives: utilisateur.messagesPrives,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ error: err });
  }
};

module.exports = getGroupes;
