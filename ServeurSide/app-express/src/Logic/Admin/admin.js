const AdminModel = require("../../Model/SuperAdmin.model");
const UserModel = require("../../Model/User.model");

const BanSiteModel = require("../../Model/Administration/BanSite.model");

const { infoToken } = require("../../Middleware/AuthToken");

async function banUser(req, res) {
  const id = infoToken(req).id;
  const idUser = req.body.idUser;
  try {
    const userBan = await UserModel.findOne({ where: { id: idUser } });
    if (!userBan)
      return res.status(200).json({ error: "Utilisateur introuvable." });
    const ban = await BanSiteModel.create({
      idUser: idUser,
      idAdmin: id,
      date: new Date(),
      raison: req.body.raison,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

module.exports = banUser;
