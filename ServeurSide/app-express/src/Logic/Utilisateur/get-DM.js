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

  try {
    let utilisateur = await UserModel.findOne({ where: { id: id } });
    let groupesMembre = await MembreGroupeModel.findAll({
      where: { userId: utilisateur.id },
    });

    let Groupes = [];

    if (groupesMembre.length == 0) return res.status(200).json({ message: "Aucun groupe..." });

    for (let i = 0; i < groupesMembre.length; i++) {

      const groupe = await GroupeModel.findOne({
        where: { id: groupesMembre[i].groupeId },
      });

      const countUtilisateurs = await MembreGroupeModel.count({
        where: { groupeId: groupesMembre[i].groupeId },
      });

      Groupes.push({
        id: groupe.id,
        nomGroupe: groupe.nom,
        imgLink: groupe.lienImage,
        nbUser: countUtilisateurs
      });
    }

    return res.status(200).json({ Groupes: Groupes });
    
  } catch (err) {
    console.log(err);
    return res.status(200).json({ error: err });
  }
};

module.exports = getGroupes;
