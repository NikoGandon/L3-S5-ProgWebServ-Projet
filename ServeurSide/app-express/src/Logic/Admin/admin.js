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

    await BanSiteModel.create({
      idUser: idUser,
      idAdmin: id,
      date: new Date(),
      raison: req.body.raison,
    });

    return res.status(200).json({ message: "Utilisateur banni." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

async function getAllBanUser(req, res) {
  try {
    const allBanned = await BanSiteModel.findAll({
      attributes: ["idUser", "idAdmin", "date", "raison"],
    });

    let banned = [];

    for (banned of allBanned) {
      const user = await UserModel.findOne({
        where: { id: banned.idUser },
      });

      const adminID = await AdminModel.findOne({
        where: { id: banned.idAdmin },
      });

      const admin = await UserModel.findOne({
        where: { id: adminID.id },
      });

      banned.push({
        idUser: banned.idUser,
        date: banned.date,
        raison: banned.raison,
        username: user.username,
        admin: admin.username,
      });
    }

    return res.status(200).json({ banned });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

async function unbanUser(req, res) {
  const idUser = req.body.idUser;
  try {
    const userBan = await UserModel.findOne({ where: { id: idUser } });

    if (!userBan)
      return res.status(200).json({ error: "Utilisateur introuvable." });

    await BanSiteModel.destroy({
      where: { idUser: idUser },
    });

    return res.status(200).json({ message: "Utilisateur débanni." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

module.exports = { banUser, getAllBanUser, unbanUser };
