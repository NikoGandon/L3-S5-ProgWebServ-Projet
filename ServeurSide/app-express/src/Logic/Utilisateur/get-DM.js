const UserModel = require("../../Model/User.model");
const GroupeModel = require("../../Model/Groupe.model");
const MembreGroupeModel = require("../../Model/Lien/MembreGroupe.model");
const MessageGroupeModel = require("../../Model/Message/MessageGroupe.model");
const MessagePriveModel = require("../../Model/Message/MessagePrive.model");
const MessageModel = require("../../Model/Message/Message.model");

const { Op } = require("sequelize");

const { infoToken } = require("../../Middleware/AuthToken");

const getGroupes = async (req, res) => {
  const id = infoToken(req).id;
  console.log("id user : " + id);

  try {
    let utilisateur = await UserModel.findOne({ where: { id: id } });
    if (!utilisateur)
      return res.status(200).json({ error: "Utilisateur non trouvé" });
    let groupes = await MembreGroupeModel.findAll({
      where: { userId: utilisateur.id },
    });
    if (groupes.length > 0) {
      var messagesGroupe = await MessageGroupeModel.findAll(
        {
          where: { idGroupe: groupes.id },
        },
        { order: [["updatedAt", "DESC"]], limit: 1 }
      );
    }
    let messagesPrives = await MessagePriveModel.findAll(
      {
        where: {
          [Op.or]: [
            { idAuteur: utilisateur.id },
            { idDestinataire: utilisateur.id },
          ],
        },
      },
      { order: [["updatedAt", "DESC"]] }
    );

    utilisateur.groupes = {
      groupes: groupes,
      messagesGroupe: messagesGroupe,
    };

    utilisateur.messagesPrives = messagesPrives;

    return res.status(200).json({
      groupes:
        utilisateur.groupes.length > 0
          ? utilisateur.groupes.groupes
          : "Vous n'êtes membre d'aucun groupe",
      messagesPrives:
        utilisateur.messagesPrives.length > 0
          ? utilisateur.messagesPrives
          : "Vous n'avez aucun message privé",
    });
    
  } catch (err) {
    console.log(err);
    return res.status(200).json({ error: err });
  }
};

module.exports = getGroupes;
